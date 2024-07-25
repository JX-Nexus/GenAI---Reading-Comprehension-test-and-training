import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGenres } from '../store/slice/passageSlice';
import { useNavigate } from 'react-router-dom';

const Novel = () => {
  const [selectedGenres, setSelectedGenresLocal] = useState([]);
  const [selectedType, setSelectedType] = useState(''); // To track whether fiction or non-fiction is selected
  const dispatch = useDispatch();
  const nav = useNavigate()

  const fictionGenres = [
    'Literary Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Thriller',
    'Romance',
    'Historical Fiction',
    'Adventure',
    'Dystopian',
    'Horror',
    'Young Adult',
    'Satire',
    'Classic',
  ];

  const nonFictionGenres = [
    'Biography',
    'Autobiography',
    'Self-Help',
    'Memoir',
    'True Crime',
    'History',
    'Philosophy',
    'Science',
    'Travel',
    'Cooking',
    'Health & Wellness',
    'Business',
    'Psychology',
    'Religion & Spirituality',
    'Essay',
  ];

  const handleGenreChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    // Handle genre selection and update type
    if (checked) {
      if (selectedType === 'non-fiction' && nonFictionGenres.includes(value)) {
        setSelectedGenresLocal([...selectedGenres, value, 'Non-Fiction']);
      } else if (selectedType === 'fiction' && fictionGenres.includes(value)) {
        setSelectedGenresLocal([...selectedGenres, value, 'Fiction']);
      } else {
        setSelectedGenresLocal([...selectedGenres, value]);
      }
    } else {
      setSelectedGenresLocal(selectedGenres.filter((genre) => genre !== value && genre !== 'Non-Fiction' && genre !== 'Fiction'));
    }
  };

  const handleTypeChange = (type) => {
    if (type !== selectedType) {
      setSelectedType(type);
      setSelectedGenresLocal([]); 
    }
  };

  const handleSubmit = () => {
    dispatch(setGenres(selectedGenres));
    nav('/passage')
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white border border-green-400 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Select Book Genres</h1>
        <p className="text-gray-700 mb-6">
          Choose your favorite genres from the list below. You can select multiple genres but only from one category at a time.
        </p>
        <div className="text-left">
          <h2 className="text-lg font-semibold text-green-600 mt-4">
            <label>
              <input
                type="radio"
                name="genreType"
                value="fiction"
                checked={selectedType === 'fiction'}
                onChange={() => handleTypeChange('fiction')}
                className="mr-2"
              />
              Fiction Genres
            </label>
          </h2>
          {selectedType === 'fiction' && fictionGenres.map((genre) => (
            <div key={genre} className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={handleGenreChange}
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">{genre}</span>
              </label>
            </div>
          ))}

          <h2 className="text-lg font-semibold text-green-600 mt-6">
            <label>
              <input
                type="radio"
                name="genreType"
                value="non-fiction"
                checked={selectedType === 'non-fiction'}
                onChange={() => handleTypeChange('non-fiction')}
                className="mr-2"
              />
              Non-Fiction Genres
            </label>
          </h2>
          {selectedType === 'non-fiction' && nonFictionGenres.map((genre) => (
            <div key={genre} className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={handleGenreChange}
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-700">{genre}</span>
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Novel;
