import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="p-8 bg-white  border border-green-400 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Welcome to ReadingWise</h1>
        <p className="text-gray-700">
          Your gateway to a world of knowledge and imagination. Whether you're looking for the latest manga, classic novels, or insightful philosophy texts, ReadingWise has something for everyone. Select your favorite book type and dive into the joy of reading!
        </p>
        <div className="mt-6">
          <Link
            to="/rec"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
