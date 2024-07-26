import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import passService from '../server/pass';
import { setPoints, setAnswer } from '../store/slice/passageSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const QuestionAnswerForm = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.passage.questions);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const { id } = useParams();

  const handleChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
    dispatch(setAnswer({ questionId, answer: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await passService.saveAnswers(id, answers);
      
      if (response && response.data && response.data.Points) {
        const points = parseFloat(response.data.Points);
        
        if (!isNaN(points)) {
          dispatch(setPoints(points));
          console.log('User answers:', points);
          navigate('result');
        } else {
          console.error('Points are not a valid number:', response.data.Points);
        }
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <div className="question-answer-form bg-green-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">Answer the Questions</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question._id} className="question-item mb-4">
            <p className="text-lg font-medium text-gray-800">{question.text}</p>
            <textarea
              value={answers[question._id]}
              onChange={(e) => handleChange(question._id, e.target.value)}
              rows="4"
              className="w-full p-3 mt-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Write your answer here..."
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
};

export default QuestionAnswerForm;
