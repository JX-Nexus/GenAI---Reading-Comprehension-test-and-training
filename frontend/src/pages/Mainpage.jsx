import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setPassage, setTime } from '../store/slice/passageSlice';

const MainPage = () => {
  const [passage, setPassageLocal] = useState('');
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [timerStarted, setTimerStarted] = useState(false);
  const [canFinish, setCanFinish] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { bookType, genres } = useSelector((state) => state.passage);

  useEffect(() => {
    if (timer > 0 && timerStarted) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      if (timer <= 0) {
        clearInterval(interval);
        setCanFinish(true);
      }

      return () => clearInterval(interval);
    }
  }, [timer, timerStarted]);

  const handleGetParagraph = async () => {
    try {
      const response = await axios.post('/api/v1/passages', { bookType, genres });
      setPassageLocal(response.data.passage);
      dispatch(setPassage(response.data.passage));
      setTimer(300); // 5 minutes timer
      setTimerStarted(true);
      setCanFinish(false);
    } catch (error) {
      console.error('Error fetching passage:', error);
    }
  };

  const handleFinish = async () => {
    if (timer >= 120) {
      try {
        await axios.post('/api/v1/save-time', { timeSpent: 300 - timer });
        navigate('/next-page'); // Replace with the actual route you want to navigate to
      } catch (error) {
        console.error('Error saving time:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="p-8 bg-white border border-green-400 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Welcome to ReadingWise</h1>
        <button
          onClick={handleGetParagraph}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Get Paragraph
        </button>
        {passage && (
          <div className="mt-6 text-left">
            <h2 className="text-lg font-semibold text-green-600">Your Passage</h2>
            <p className="text-gray-700 mt-2">{passage}</p>
          </div>
        )}
        <div className="mt-6">
          <p className="text-gray-700 mb-2">Time Remaining: {Math.max(timer, 0)} seconds</p>
          <button
            onClick={handleFinish}
            disabled={!canFinish}
            className={`px-4 py-2 rounded ${canFinish ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
