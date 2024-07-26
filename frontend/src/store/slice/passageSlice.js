import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  passage: '',
  questions: [],
  genres: [],
  bookType: '',
  points: '',
  occupation: '', // New field
  mythology: '', // New field
  scripturesName: '', // New field
  selectedType: '', // New field
  type: '', // New field
};

const passageSlice = createSlice({
  name: 'passage',
  initialState,
  reducers: {
    setPassage: (state, action) => {
      state.passage = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      const question = state.questions.find(q => q._id === questionId);
      if (question) {
        question.answer = answer;
      }
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setBookType: (state, action) => {
      state.bookType = action.payload;
    },
    setOccupation: (state, action) => { // New reducer
      state.occupation = action.payload;
    },
    setMythology: (state, action) => { // New reducer
      state.mythology = action.payload;
    },
    setScripturesName: (state, action) => { // New reducer
      state.scripturesName = action.payload;
    },
    setSelectedType: (state, action) => { // New reducer
      state.selectedType = action.payload;
    },
    setType: (state, action) => { // New reducer
      state.type = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    resetPassageData: (state) => {
      state.passage = '';
      state.questions = [];
      state.genres = [];
      state.bookType = '';
      state.occupation = ''; // Resetting new fields
      state.mythology = '';
      state.scripturesName = '';
      state.selectedType = '';
      state.type = '';
    },
  },
});

export const { 
  setPassage, 
  setPoints, 
  setTime, 
  setQuestions, 
  setGenres, 
  setBookType, 
  setAnswer, 
  resetPassageData, 
  setOccupation, 
  setMythology, 
  setScripturesName, 
  setSelectedType, 
  setType 
} = passageSlice.actions;

export default passageSlice.reducer;
