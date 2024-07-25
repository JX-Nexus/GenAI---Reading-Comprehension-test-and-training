import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  passage: '',
  questions: [],
  genres: [],
  bookType: '',
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
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setBookType: (state, action) => {
      state.bookType = action.payload;
    },
    setTime:(state, action) => {
        state.time = action.payload;
      },
    resetPassageData: (state) => {
      state.passage = '';
      state.questions = [];
      state.genres = [];
      state.bookType = '';
    },
  },
});

export const { setPassage, setTime,setQuestions, setGenres, setBookType, resetPassageData } = passageSlice.actions;
export default passageSlice.reducer;
