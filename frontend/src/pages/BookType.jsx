import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBookType } from '../store/slice/passageSlice';

const BookTypeSelector = () => {
  const [selectedBookType, setSelectedBookType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedBookType(value);
    dispatch(setBookType(value));

    // Redirect based on the selected book type
    if (value) {
      if (['Philosophy'].includes(value)) {
        navigate('/passage');
      } else if (value === 'Religious Scriptures' || 'Education') {
        navigate(`/${value.toLowerCase().replace(' ', '-')}/types`);
      } else {
        navigate(`/${value.toLowerCase().replace(' ', '-')}/genres`);
      }
    }
  };

  const bookTypes = [
    'Manga',
    'Novel',
    'Graphic Novel',
    'Education',
    'Philosophy',
    'Poetry',
    "Children's Book",
    'Religious Scriptures',
  ];

  return (
    <div className="p-6 mt-48 bg-white border border-green-400 rounded-lg shadow-lg max-w-md mx-auto">
      <label htmlFor="bookType" className="block text-green-600 mb-2 font-medium">
        Select the type of book:
      </label>
      <select
        id="bookType"
        value={selectedBookType}
        onChange={handleChange}
        className="border border-green-300 rounded-md p-2 bg-white text-green-700 focus:outline-none focus:border-green-500 w-full"
      >
        <option value="" disabled>Select a book type</option>
        {bookTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {selectedBookType && (
        <p className="mt-4 text-green-500">
          You selected: <span className="font-semibold">{selectedBookType}</span>
        </p>
      )}
    </div>
  );
};

export default BookTypeSelector;
