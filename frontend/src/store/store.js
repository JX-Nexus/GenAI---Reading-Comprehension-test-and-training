import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import passageSlice from './slice/passageSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        passage: passageSlice,
       
        
    }
});


export default store;