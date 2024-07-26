import React from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';

const Recommendation = () => {
  // Get the recommendation from Redux store
  const recommendation = useSelector((state) => state.recommendation.recommendation);

  // Debugging: Check the type and value of the recommendation
  console.log('Recommendation:', recommendation);
  console.log('Type of recommendation:', typeof recommendation);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-green-50 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Book Recommendations</h1>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-green-200">
          <ReactMarkdown className="text-gray-700">
            {recommendation}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
