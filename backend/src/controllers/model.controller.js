import {GoogleGenerativeAI} from "@google/generative-ai";
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import UserPassage from '../models/passage.model.js';
import {ApiError} from '../utils/ApiError.js'
import dotenv from 'dotenv';
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log(`Gemini API Key in controller: ${process.env.GEMINI_API_KEY}`);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Act like a model trained to provide passages and questions based on those passages.when asked for passage only provide the passage nothing else and also you can provide anytype of passage as far as its withing the users preferences. Depending on how the questions are answered and how much time the user takes to read the passage, assign points. Additionally, based on the user's preferred genre and book type, recommend books to them. For example, if a user answers that the villain was right, recommend books that align with that perspective, whereas if someone answers that the villain was wrong, suggest books that align with that viewpoint",
  });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  
  const generatePassage = async (occupation, genres, bookType) => {
  const Session = model.startChat({
    generationConfig,
    
    
      messages: [
        { "role": "user", "content": `Generate a passage of 200 pages for a ${occupation}, who likes ${genres} genres, and wants to read a ${bookType}. The passage should be engaging, detailed, and appropriate for someone interested in these genres. Include relevant themes and settings that align with the reader's interests.`},
        { "role": "model", "content": "business" }
      ]
    ,
    
      messages: [
        { "role": "user", "content": "Watch a live concert" },
        { "role": "model", "content": "entertainment" }
      ]
    });
  }
  const parseQuestions = (text) => {
    const questions = [];
    
    // Split the text into sections based on the question categories
    const sections = text.split('\n\n**');
    
    // Check if there are sections in the response
    if (sections.length > 1) {
      const contextualQuestions = sections[1].split('\n').filter(line => line.trim() !== '');
      const viewpointQuestions = sections[2] ? sections[2].split('\n').filter(line => line.trim() !== '') : [];
  
      // Process contextual questions
      contextualQuestions.forEach((question, index) => {
        // Skip index 0 if it's a header or empty line
        if (index > 0 && question.trim() !== '') {
          questions.push({ text: question.trim() });
        }
      });
  
      // Process viewpoint questions
      viewpointQuestions.forEach((question, index) => {
        // Skip index 0 if it's a header or empty line
        if (index > 0 && question.trim() !== '') {
          questions.push({ text: question.trim() });
        }
      });
    }
  
    return questions;
  };
  
  



const passage= asyncHandler(async (req, res) => {
  const {occupation, genres, bookType} = req.body
    
const prompt = `Generate a passage of 300 words for a ${occupation}, who likes ${genres} genres, and wants to read a ${bookType}. The passage should be engaging, detailed, and appropriate for someone interested in these genres. Include relevant themes and settings that align with the reader's interests.`

const result = await model.generateContent(prompt, generatePassage.Session);
const response = result.response;
const text = response.text();

const newPassage = new UserPassage({
  text,
  userId: req.user._id,
  genres,
  
});

const savedPassage = await newPassage.save();


return res
.status(200)
.json(
    new ApiResponse(
        200,
        {
          passageId: savedPassage._id,
          text: savedPassage.text
        },
        'passage generated successfully'
    )
);

})


const questions = asyncHandler(async (req, res) => {
  const { passageId } = req.body;

  try {
    // Retrieve the saved passage
    const passage = await UserPassage.findById(passageId);
    if (!passage) {
      return res.status(404).json(new ApiError('Passage not found'));
    }

    const passageText = passage.text;

    // Define the prompt for generating questions
    const prompt = `Generate 10 questions based on the following passage:

${passageText}

Contextual Questions: Create questions that focus on the specific details, themes, and events described in the passage. These questions should assess the reader's understanding and recall of the passage's content.

Viewpoint and Rationality Questions: Include two questions that explore the reader's perspective and reasoning. For example:
- If the passage portrays a villain as complex but ultimately not a hero, ask: "Do you believe the villain's actions were justified? Explain your reasoning."
- If the protagonist is depicted as naive, ask: "Should the protagonist have taken a more assertive approach or made different choices? Justify your answer."

Ensure that the questions are balanced between evaluating factual content and encouraging personal opinion and critical thinking about the passage.`;


    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

  
    const questions = parseQuestions(text);

 
    passage.questions = questions;
    await passage.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          questions: passage.questions
        },
        'Questions generated and saved successfully'
      )
    );
  } catch (error) {
    console.error('Error retrieving passage or generating questions:', error);
    return res.status(500).json(new ApiError('Failed to retrieve passage or generate questions'));
  }
});


const getPassageAndsaveAnswers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { answers, bookType } = req.body; // Expecting answers as an array of objects [{ questionId, answer }]

  try {
    // Find the passage by ID
    const passage = await UserPassage.findById(id).populate('questions');
    if (!passage) {
      return res.status(404).json(new ApiError('Passage not found'));
    }

    // Save answers
    if (answers && Array.isArray(answers)) {
      for (const answer of answers) {
        const { questionId, answer: answerText } = answer;

        // Find the question within the passage
        const question = passage.questions.id(questionId);
        if (question) {
          // Update the question with the user's answer
          question.answer = answerText;
        }
      }

      // Save the updated passage
      await passage.save();
    }

    // Generate recommendation
    const finalBookType = bookType ? bookType : "Novel";
    const prompt = `Based on the passage: "${passage.text}" and the following questions and answers: ${JSON.stringify(passage.questions)}, recommend a ${finalBookType} considering the user's answers and their understanding of grammar. Also, consider the genres: ${passage.genres}.`;

    const result = await model.generateContent(prompt, generatePassage.Session);

    // Make sure the result is handled properly
    const responseText = result.response.content
    console.log("This is model Response" ,responseText)
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          text: passage.text,
          questions: passage.questions,
          recommendation: responseText,
        },
        'Passage and questions updated successfully'
      )
    );
  } catch (error) {
    console.error('Error retrieving or saving answers:', error);
    return res.status(500).json(new ApiError('Failed to retrieve passage or save answers'));
  }
});


export{
    passage,
    questions,
    getPassageAndsaveAnswers
}