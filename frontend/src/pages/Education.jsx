import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGenres, setBookType, setSelectedType, setType } from '../store/slice/passageSlice';
import { useNavigate } from 'react-router-dom';

const Education = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedDetail, setSelectedDetail] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();

  const educationalLevels = [
    'Elementary',
    'Middle School',
    'High School',
    'Undergraduate',
    'Postgraduate',
    'Professional',
  ];

  const subjectsByLevel = {
    Elementary: ['Mathematics', 'Science', 'History', 'Language Arts', 'Physical Education'],
    'Middle School': ['Algebra', 'Biology', 'World History', 'Literature', 'Physical Education'],
    'High School': ['Calculus', 'Chemistry', 'World History', 'Literature', 'Physical Education'],
    Undergraduate: ['Computer Science', 'Engineering', 'Economics', 'Psychology', 'Biology'],
    Postgraduate: ['Advanced Research Methods', 'Theoretical Physics', 'Philosophy', 'Literary Criticism', 'Data Science'],
    Professional: ['Project Management', 'Business Analytics', 'Software Development', 'Law', 'Medicine', "Singer", 'Trader', 'Streamer', 'Artist'],
  };

  const specializationsByProfession = {
    'Business Analytics': ['Marketing Analysis', 'Financial Analysis', 'Data Analysis', 'Operations Analysis'],
    'Project Management': ['Agile Project Management', 'Waterfall Project Management', 'Risk Management'],
    'Software Development': ['Frontend Development', 'Backend Development', 'Full Stack Development'],
    'Law': ['Corporate Law', 'Criminal Law', 'Family Law'],
    'Medicine': ['Cardiology', 'Neurology', 'Pediatrics'],
    "Singer": ['Vocal Training', 'Music Theory', 'Performance Techniques'],
    'Trader': ['Stock Trading', 'Forex Trading', 'Crypto Trading'],
    'Streamer': ['Game Streaming', 'IRL Streaming', 'Creative Streaming'],
    'Artist': ['Painting', 'Sculpting', 'Digital Art'],
  };

  const detailsBySpecialization = {
    'Marketing Analysis': ['Consumer Behavior', 'Market Research', 'Brand Analysis'],
    'Financial Analysis': ['Financial Statements', 'Investment Analysis', 'Budgeting'],
    'Data Analysis': ['Big Data', 'Machine Learning', 'Predictive Analytics'],
    'Operations Analysis': ['Supply Chain Management', 'Process Improvement', 'Performance Metrics'],
    'Agile Project Management': ['Scrum', 'Kanban', 'Lean'],
    'Waterfall Project Management': ['Planning', 'Execution', 'Closing'],
    'Risk Management': ['Risk Assessment', 'Risk Mitigation', 'Risk Monitoring'],
    'Frontend Development': ['HTML', 'CSS', 'JavaScript'],
    'Backend Development': ['Node.js', 'Python', 'Java'],
    'Full Stack Development': ['React', 'Node.js', 'Databases'],
    'Corporate Law': ['Contract Law', 'Employment Law', 'Intellectual Property'],
    'Criminal Law': ['Criminal Procedure', 'Evidence', 'Sentencing'],
    'Family Law': ['Divorce', 'Child Custody', 'Adoption'],
    'Cardiology': ['Heart Diseases', 'Cardiac Surgery', 'Preventive Cardiology'],
    'Neurology': ['Brain Disorders', 'Neurosurgery', 'Neurological Rehabilitation'],
    'Pediatrics': ['Child Health', 'Pediatric Surgery', 'Neonatology'],
    'Vocal Training': ['Voice Modulation', 'Breathing Techniques', 'Pitch Control'],
    'Music Theory': ['Scales', 'Chords', 'Harmony'],
    'Performance Techniques': ['Stage Presence', 'Audience Interaction', 'Mic Techniques'],
    'Stock Trading': ['Equities', 'Options', 'ETFs'],
    'Forex Trading': ['Currency Pairs', 'Technical Analysis', 'Fundamental Analysis'],
    'Crypto Trading': ['Blockchain', 'Altcoins', 'Market Trends'],
    'Game Streaming': ['Gameplay', 'Audience Engagement', 'Streaming Setup'],
    'IRL Streaming': ['Real-Life Content', 'Audience Interaction', 'Streaming Techniques'],
    'Creative Streaming': ['Art Creation', 'Creative Process', 'Community Building'],
    'Painting': ['Oil Painting', 'Watercolor', 'Acrylic'],
    'Sculpting': ['Clay', 'Stone', 'Metal'],
    'Digital Art': ['Graphic Design', '3D Modeling', 'Digital Illustration'],
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    setSelectedSubject('');
    setSelectedProfession('');
    setSelectedSpecialization('');
    setSelectedDetail('');
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedProfession('');
    setSelectedSpecialization('');
    setSelectedDetail('');
  };

  const handleProfessionChange = (event) => {
    setSelectedProfession(event.target.value);
    setSelectedSpecialization('');
    setSelectedDetail('');
  };

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
    setSelectedDetail('');
  };

  const handleDetailChange = (event) => {
    setSelectedDetail(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedLevel && selectedSubject && selectedProfession && selectedSpecialization && selectedDetail) {
      dispatch(setGenres([selectedSubject]));
      dispatch(setBookType('Education'));
      dispatch(setSelectedType(selectedProfession));
      dispatch(setType(selectedSpecialization));
      nav('/passage');
    } else {
      alert('Please select all options.');
    }
  };

  const filteredSubjects = selectedLevel
    ? subjectsByLevel[selectedLevel] || []
    : [];

  const filteredSpecializations = selectedProfession
    ? specializationsByProfession[selectedProfession] || []
    : [];

  const filteredDetails = selectedSpecialization
    ? detailsBySpecialization[selectedSpecialization] || []
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white border border-green-400 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Select Educational Material</h1>
        <p className="text-gray-700 mb-6">
          Choose your educational level, profession, and specialization. This will help us recommend the most relevant educational content for you.
        </p>
        <div className="text-left">
          <h2 className="text-lg font-semibold text-green-600 mt-4">Select Educational Level</h2>
          {educationalLevels.map((level) => (
            <div key={level} className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="educationalLevel"
                  value={level}
                  checked={selectedLevel === level}
                  onChange={handleLevelChange}
                  className="form-radio text-green-500"
                />
                <span className="ml-2 text-gray-700">{level}</span>
              </label>
            </div>
          ))}

          {selectedLevel && (
            <>
              <h2 className="text-lg font-semibold text-green-600 mt-6">Select Subject</h2>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
                  <div key={subject} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="subject"
                        value={subject}
                        checked={selectedSubject === subject}
                        onChange={handleSubjectChange}
                        className="form-radio text-green-500"
                      />
                      <span className="ml-2 text-gray-700">{subject}</span>
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Select an educational level to see available subjects.</p>
              )}
            </>
          )}

          {selectedSubject && (
            <>
              <h2 className="text-lg font-semibold text-green-600 mt-6">Select Profession</h2>
              {Object.keys(specializationsByProfession).map((profession) => (
                <div key={profession} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="profession"
                      value={profession}
                      checked={selectedProfession === profession}
                      onChange={handleProfessionChange}
                      className="form-radio text-green-500"
                    />
                    <span className="ml-2 text-gray-700">{profession}</span>
                  </label>
                </div>
              ))}
            </>
          )}

          {selectedProfession && (
            <>
              <h2 className="text-lg font-semibold text-green-600 mt-6">Select Specialization</h2>
              {filteredSpecializations.length > 0 ? (
                filteredSpecializations.map((specialization) => (
                  <div key={specialization} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="specialization"
                        value={specialization}
                        checked={selectedSpecialization === specialization}
                        onChange={handleSpecializationChange}
                        className="form-radio text-green-500"
                      />
                      <span className="ml-2 text-gray-700">{specialization}</span>
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Select a profession to see available specializations.</p>
              )}
            </>
          )}

          {selectedSpecialization && (
            <>
              <h2 className="text-lg font-semibold text-green-600 mt-6">Select Detail</h2>
              {filteredDetails.length > 0 ? (
                filteredDetails.map((detail) => (
                  <div key={detail} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="detail"
                        value={detail}
                        checked={selectedDetail === detail}
                        onChange={handleDetailChange}
                        className="form-radio text-green-500"
                      />
                      <span className="ml-2 text-gray-700">{detail}</span>
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Select a specialization to see available details.</p>
              )}
            </>
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

export default Education;
