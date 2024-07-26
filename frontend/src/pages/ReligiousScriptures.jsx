import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGenres, setBookType, setMythology, setScripturesName } from '../store/slice/passageSlice';
import { useNavigate } from 'react-router-dom';

const ReligiousScriptures = () => {
  const [selectedMythology, setSelectedMythology] = useState('');
  const [selectedScripture, setSelectedScripture] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();

  const mythologies = [
    'Hindu',
    'Greek',
    'Roman',
    'Norse',
    'Egyptian',
    'Celtic',
    'Japanese',
    'Native American',
  ];

  const scripturesByMythology = {
    Hindu: [
      'Bhagavad Gita',
      'Vedas',
      'Upanishads',
      'Ramayana',
      'Mahabharata',
    ],
    Greek: [
      'The Iliad',
      'The Odyssey',
      'Theogony',
      'Works and Days',
      'Argonautica',
    ],
    Roman: [
      'Aeneid',
      'Metamorphoses',
      'The Twelve Tables',
      'De Rerum Natura',
      'Histories',
    ],
    Norse: [
      'Poetic Edda',
      'Prose Edda',
      'Saga of the Ynglings',
      'Saga of the Skjoldungs',
      'Saga of the Volsungs',
    ],
    Egyptian: [
      'Book of the Dead',
      'Pyramid Texts',
      'Coffin Texts',
      'The Book of the Heavenly Cow',
      'The Instruction of Ptahhotep',
    ],
    Celtic: [
      'The Book of Invasions',
      'The Mabinogion',
      'The Book of Kells',
      'The Táin Bó Cúailnge',
      'The Lebor Gabála Érenn',
    ],
    Japanese: [
      'The Kojiki',
      'The Nihon Shoki',
      'The Fudoki',
      'The Manyoshu',
      'The Genji Monogatari',
    ],
    'Native American': [
      'The Popol Vuh',
      'The Book of the Hopi',
      'Navajo Creation Story',
      'The Iroquois Book of the Cosmos',
      'Lakota Creation Story',
    ],
  };

  const handleMythologyChange = (event) => {
    const mythology = event.target.value;
    setSelectedMythology(mythology);
    setSelectedScripture(''); 
  };

  const handleScriptureChange = (event) => {
    setSelectedScripture(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedMythology && selectedScripture) {
      dispatch(setMythology(selectedMythology));
      dispatch(setScripturesName(selectedScripture));
      dispatch(setGenres([selectedMythology]));
      dispatch(setBookType('Religious Scriptures'));
      nav('/passage');
    } else {
      alert('Please select both a mythology and a scripture.');
    }
  };

  const filteredScriptures = selectedMythology
    ? scripturesByMythology[selectedMythology] || []
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white border border-green-400 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Select Religious Scriptures</h1>
        <p className="text-gray-700 mb-6">
          Choose a mythology and a scripture from the list below. This will help us recommend the most relevant religious texts for you.
        </p>
        <div className="text-left">
          <h2 className="text-lg font-semibold text-green-600 mt-4">Select Mythology</h2>
          {mythologies.map((mythology) => (
            <div key={mythology} className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="mythology"
                  value={mythology}
                  checked={selectedMythology === mythology}
                  onChange={handleMythologyChange}
                  className="form-radio text-green-500"
                />
                <span className="ml-2 text-gray-700">{mythology}</span>
              </label>
            </div>
          ))}

          <h2 className="text-lg font-semibold text-green-600 mt-6">Select Scripture</h2>
          {filteredScriptures.length > 0 ? (
            filteredScriptures.map((scripture) => (
              <div key={scripture} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="scripture"
                    value={scripture}
                    checked={selectedScripture === scripture}
                    onChange={handleScriptureChange}
                    className="form-radio text-green-500"
                  />
                  <span className="ml-2 text-gray-700">{scripture}</span>
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Select a mythology to see available scriptures.</p>
          )}
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

export default ReligiousScriptures;
