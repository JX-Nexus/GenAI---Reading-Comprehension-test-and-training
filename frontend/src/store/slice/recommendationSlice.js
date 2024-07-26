import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recommendation: null
}

const recommendationSlice = createSlice({
    name: "recommendation",
    initialState,
    reducers: {

        setRecommendation: (state, action) => {
            state.status = true;
            state.recommendation = action.payload;
        },
        
     }
})

export const {setRecommendation} = recommendationSlice.actions;

export default recommendationSlice.reducer;