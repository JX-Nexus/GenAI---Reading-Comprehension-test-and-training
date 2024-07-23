import {GoogleGenerativeAI} from "@google/generative-ai";
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log(`Gemini API Key in controller: ${process.env.GEMINI_API_KEY}`);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Hello there",
  });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

const passageAndQuestions = asyncHandler(async (req, res) => {

    const Session = model.startChat({
        generationConfig,
    
        history: [
          {
            role: "user",
            parts: [
              {text: "hi\n"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "Hi there! 👋  How can I help you today? 😊 \n"},
            ],
          },
        ],
      });
    
const prompt = "Write a story about a magic backpack."

const result = await model.generateContent(prompt, Session);
const response = result.response;
const text = response.text();

return res
.status(200)
.json(
    new ApiResponse(
        200,
        {
            text
        },
        'passage generated successfully'
    )
);

})

export{
    passageAndQuestions,
}