import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import passService from '../server/pass';
import { setRecommendation } from '../store/slice/recommendationSlice.js';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const { 
    points,
    questions,
    genres,
    bookType,
    mythology,         
    scripturesName,
    selectedType,
    type} = useSelector((state) => state.passage);
  const { occupation } = useSelector((state) => state.auth); // Assuming occupation is in auth slice
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const results = await passService.getRecommendation({
        occupation,
        genres,
        bookType,
        mythology,         
        scripturesName,
        selectedType,
        type
      });

      console.log(results.data)
      dispatch(setRecommendation(results.data));

      navigate('/recommendation')
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-green-50 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Questions and Answers</h1>
        <h2 className="text-xl font-semibold text-green-500 mb-4">
          Points: <span className="font-bold">{points}</span>
        </h2>
        <ul className="space-y-4">
          {questions.map((question, index) => (
            <li key={question._id} className="p-4 bg-green-100 rounded-lg shadow-sm border border-green-200">
              <strong className="text-lg text-green-700"> {question.text}</strong>
              <div className="mt-2 text-gray-600">Answer: {question.answer || 'No answer provided'}</div>
            </li>
          ))}
        </ul>
        <button
          onClick={handleSubmit}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          Get Recommendation
        </button>
      </div>
    </div>
  );
};

export default Result;
