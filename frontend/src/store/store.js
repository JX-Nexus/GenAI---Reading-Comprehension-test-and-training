import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import passageSlice from './slice/passageSlice';
import recommendationSlice from './slice/recommendationSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        passage: passageSlice,
        recommendation: recommendationSlice,
       
        
    }
});


export default store;