import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PassService from '../server/pass.js';
import { setQuestions, setPassage } from '../store/slice/passageSlice';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [passageId, setPassageId] = useState("");
    const [passage, setPassageLocal] = useState(null);
    const [timer, setTimer] = useState(0);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [canFinish, setCanFinish] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { 
      genres,
      bookType,
      mythology,
      scripturesName,
      selectedType,
      type } = useSelector((state) => state.passage);
    const { occupation } = useSelector((state) => state.auth.userData);

    const handleGetParagraph = async () => {
        try {
            const response = await PassService.getPassage({ occupation,
              genres,
              bookType,
              mythology,
              scripturesName,
              selectedType,
              type });
              
            console.log(response);
            setPassageLocal(response.data.text);
            setPassageId(response.data.passageId);
            dispatch(setPassage(response.passage));
            setTimer(300);
            setIsTimerStarted(true);
            setCanFinish(false);
        } catch (error) {
            console.error('Error fetching passage:', error);
        }
    };

    useEffect(() => {
        let interval;
        if (isTimerStarted) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerStarted]);

    const handleFinish = async (passageId) => {
        if (timer >= 120) { // Ensure user has read for at least 2 minutes
            try {
                console.log('Generating questions for passageId:', passageId);
                const response = await PassService.generateQuestions(passageId);
                const questions = response.data.questions;
                dispatch(setQuestions(questions));
                console.log('Questions generated:', questions);
                setTimeout(() => {
                    navigate(`${passageId}`);
                }, 1000);
                console.log('Time spent reading (seconds):', timer);
            } catch (error) {
                console.error('Failed to generate questions:', error);
                alert('There was an error generating the questions. Please try again.');
            }
        } else {
            alert('You need to spend at least 2 minutes reading.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className={`p-8 bg-white border border-green-400 rounded-lg shadow-lg text-center ${passage ? 'max-w-4xl' : 'max-w-lg'}`}>
                {!passage ? (
                    <>
                        <h1 className="text-3xl font-bold text-green-600 mb-4">Welcome to ReadingWise</h1>
                        <p className="text-gray-700 mb-6">
                            Click the button below to get a passage based on your selected book type and genres.
                        </p>
                        <button
                            onClick={handleGetParagraph}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                        >
                            Get Passage
                        </button>
                    </>
                ) : (
                    <>
                        <div className="mt-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
                            <p>{passage}</p>
                        </div>
                        <div className="mt-6">
                            <p>Time left: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</p>
                            <button
                                onClick={() => handleFinish(passageId)}
                                className={`px-4 py-2 rounded w-full ${timer < 120 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white transition duration-200`}
                                disabled={timer < 120}
                            >
                                Finish
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MainPage;
