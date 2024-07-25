import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGenres } from '../store/slice/passageSlice.js';

const MangaGenres = () => {
  const [selectedGenres, setSelectedGenresLocal] = useState([]);
  const dispatch = useDispatch();

  const mangaGenres = [
    'Shonen', 'Shojo', 'Seinen', 'Josei', 'Isekai', 'Fantasy', 'Romance', 'Horror', 'Comedy'
  ];

  const handleGenreChange = (genre) => {
    let updatedGenres = [...selectedGenres];
    if (selectedGenres.includes(genre)) {
      updatedGenres = updatedGenres.filter((g) => g !== genre);
    } else {
      updatedGenres.push(genre);
    }
    setSelectedGenresLocal(updatedGenres);
    dispatch(setGenres(updatedGenres));
  };

  return (
    <div className="p-6 mt-12 bg-white border border-green-400 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-green-600 mb-4 font-medium">Select Manga Genres:</h2>
      <div className="grid grid-cols-2 gap-4">
        {mangaGenres.map((genre) => (
          <div key={genre} className="flex items-center">
            <input
              type="checkbox"
              id={genre}
              value={genre}
              onChange={() => handleGenreChange(genre)}
              className="mr-2"
              checked={selectedGenres.includes(genre)}
            />
            <label htmlFor={genre} className="text-green-700">{genre}</label>
          </div>
        ))}
      </div>
      {selectedGenres.length > 0 && (
        <p className="mt-4 text-green-500">
          Selected Genres: <span className="font-semibold">{selectedGenres.join(', ')}</span>
        </p>
      )}
    </div>
  );
};

export default MangaGenres;
