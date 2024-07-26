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
    systemInstruction: `Act as a model designed to generate passages and corresponding questions based on user preferences. When requested:
                        Provide Only the Passage:
                        Ensure the passage aligns with the user's specified genres and preferences.
                        Assign Points Based on Answers:
                        After the user answers the questions and the time taken to read the passage, assign points to gauge their understanding and engagement.
                        Evaluate Answers Rigorously:
                        Do not award points for answers that are clearly irrelevant, such as generic responses like "asdf" or "asdfg" that do not relate to the passage or questions. In such cases, give zero points.,`
  });

  const model1 = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
      Act as a book recommendation model. Your task is to recommend books based on the following user preferences:
      - **Genres:** The genres specified by the user.
      - **Intended Reading Time:** The total time the user plans to spend reading, in minutes.
      - **Book Type:** The type of book the user is interested in (e.g., manga, novel, religious scriptures).
  
      Provide book recommendations that align with these preferences. Each recommendation should be formatted in Markdown with good line spacing and readability. 
  
      The format for each recommendation should be as follows:
  
      **Title:** _Book Title_  
      **Author:** _Author Name_  
      **Description:**  
      _Brief description of the book, ensuring it is concise and highlights key aspects that align with the user's preferences._
  
      **Why it matches:**  
      _Explain why this book aligns with the user's specified genres, intended reading time, and book type. Be specific about elements that make it a good fit._
  
      **Estimated Reading Time:**  
      _Provide an estimate of the time required to read the book, in minutes._
  
      **Additional Details:**  
      _Any other relevant details that might help the user decide, such as awards, notable reviews, or unique aspects of the book._
  
      Ensure that each line is properly formatted and no line is excessively long to maintain readability in Markdown. Use line breaks and spacing to keep the content clear and well-organized.
    `,
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  function cleanAndFormatPassage(passage) {
    if (!passage || typeof passage !== 'string') {
      throw new Error('Invalid passage format.');
    }
  
    // Remove excessive markdown headers
    let formattedPassage = passage.replace(/##\s*/g, '');
  
    // Remove excessive line breaks and extra spaces
    formattedPassage = formattedPassage.replace(/\n\s*\n+/g, '\n\n').trim();
  
    // Replace excessive new lines with a single line break
    formattedPassage = formattedPassage.replace(/\n+/g, '\n');
  
    // Format the passage with consistent spacing and alignment
    formattedPassage = formattedPassage.split('\n').map(line => line.trim()).join('\n');
  
    return formattedPassage;
  }
  

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
  
    // Split the text into lines
    const lines = text.split('\n');
  
    // Regular expression to match question patterns (starting with a number and a period)
    const questionPattern = /^\d+\.\s+/;
  
    lines.forEach((line) => {
      if (questionPattern.test(line.trim())) {
        questions.push({ text: line.trim() });
      }
    });
  
    return questions;
  };

  
  function cleanQuestionsData(questionsArray) {
    const cleanedData = questionsArray.map(item => {
      // Remove leading numbers and whitespace from the question text
      const question = item.text.replace(/^\d+\.\s*/, '');
      const answer = item.answer;
      return { question, answer };
    });
  
    // Convert cleanedData to the required format
    const questionsAndAnswers = cleanedData.map(item => 
      `Question: ${item.question}, Answer: ${item.answer}`
    ).join('; ');
  
    return questionsAndAnswers;
  }
  



  const passage = asyncHandler(async (req, res) => {
    const { occupation, genres, bookType, mythology, scripturesName } = req.body;
  
    console.log(occupation, genres, bookType, mythology, scripturesName);
    
    let prompt;
  
switch (bookType) {
      case 'Novel':
        prompt = `Generate a captivating and engaging 300-word passage for a ${occupation} who enjoys ${genres} genres and is interested in reading a novel. The passage should have a compelling narrative with well-developed characters and an intriguing plot.`;
        break;
      case 'Textbook':
        prompt = `Generate a 300-word informative and educational passage for a ${occupation} who likes ${genres} genres and is looking for a textbook. The passage should be structured, with clear explanations and relevant examples.`;
        break;
      case 'Graphic Novel':
        prompt = `Generate a visually descriptive and engaging 300-word passage for a ${occupation} who enjoys ${genres} genres and is interested in reading a graphic novel. The passage should describe vivid scenes and dynamic visuals that match the style of a graphic novel.`;
        break;
      case 'Religious Scriptures':
        prompt = `Generate a reflective and insightful 300-word passage for a ${occupation} who is interested in ${genres} and is looking to read religious scriptures from ${mythology} and ${scripturesName}. The passage should explore spiritual themes and provide thoughtful reflections aligned with religious teachings.`;
        break;
      case 'Educational':
        prompt = `Generate a 300-word passage for a ${occupation} who is interested in ${genres} and looking for educational content. The passage should provide valuable information or lessons related to the educational topic.`;
        break;
      default:
        prompt = `Generate a 300-word passage for a ${occupation} who likes ${genres} genres and is interested in reading a ${bookType}. The passage should be engaging and appropriate for the specified book type.`;
    }
  
    try {
      const result = await model.generateContent(prompt, generatePassage.Session);
      const response = result.response;
      const text = await response.text(); // Ensure response.text() is awaited
  
      const newPassage = new UserPassage({
        text,
        userId: req.user._id,
        genres,
      });
  
      const savedPassage = await newPassage.save();
  
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            passageId: savedPassage._id,
            text: savedPassage.text,
          },
          'Passage generated successfully'
        )
      );
    } catch (error) {
      console.error('Error generating passage:', error);
      return res.status(500).json(
        new ApiError('Failed to generate passage')
      );
    }
  });
  


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

Ensure that the questions are balanced between evaluating factual content and encouraging personal opinion and critical thinking about the passage. Do not give points after each question, only give questions.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const questions = parseQuestions(text);

    console.log(text, "\n questions", questions);

    passage.questions = questions.map(q => ({ text: q.text })); // Assuming parseQuestions gives only text
    await passage.save();

    // Send the questions with their IDs back to the frontend
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          questions: passage.questions // This will include _id as well as text
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
  const { answers } = req.body; 
  
  try {
    // Find the passage by ID
    const passage = await UserPassage.findById(id).populate('questions');
    if (!passage) {
      return res.status(404).json(new ApiError('Passage not found'));
    }

    // Save answers
    if (answers && Array.isArray(answers)) {
      for (const answer of answers) {
        const { _id, answer: answerText } = answer;

        // Find the question within the passage
        const question = passage.questions.id(_id);
        if (question) {
          question.answer = answerText;
        }
      }

      // Save the updated passage
      await passage.save();
    }

    const passageQuestion = cleanQuestionsData(passage.questions);

    const prompt = `Given the passage: ${passage.text} and the questions and answers: ${passageQuestion}, award up to 50 points based on the user's responses. Provide only the score out of 50—no additional notes or repetition of the passage. If any answers are incorrect, irrelevant, or missing, assign a score of 0.do not assign points infront of question only give overall points`;
    const result = await model.generateContent(prompt, generatePassage.Session);

    const response = result.response;
    const responseText = response.text();
    const cleanText = cleanAndFormatPassage(responseText);

    if (cleanText){
      passage.points = cleanText
      await passage.save();
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          questions: passage.questions,
          Points: cleanText,
        },
        'Passage and questions updated successfully'
      )
    );
  } catch (error) {
    console.error('Error retrieving or saving answers:', error);
    return res.status(500).json(new ApiError('Failed to retrieve passage or save answers'));
  }
});

const getRecommendation = asyncHandler(async (req, res) => {
  const { occupation, genres, bookType, mythology, scripturesName, selectedType, type } = req.body;

  let prompt;

  switch (bookType) {
    case 'Religious Scriptures':
      prompt = `Recommend a religious scripture from ${mythology}, and ${scripturesName}.`;
      break;
    case 'Education':
      prompt = `Recommend a book for a ${selectedType} who wants to learn ${type}.`;
      break;
    default:
      prompt = `Recommend a ${bookType} for ${occupation} who likes the genres: ${genres}. `;
  }

  try {
    const result = await model1.generateContent(prompt, generatePassage.Session);
    const text = result.response.text(); // Ensure response.text() is awaited
 
  
    return res.status(200).json(
      new ApiResponse(
        200,
        text  
        ,

        'Recommendation generated successfully'
      )
    );
  } catch (error) {
    console.error('Error generating recommendation:', error);
    return res.status(500).json(
      new ApiError('Failed to generate recommendation')
    );
  }
});

export{
    passage,
    questions,
    getPassageAndsaveAnswers,
    getRecommendation
}