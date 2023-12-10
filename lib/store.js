import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        // Add other reducers as needed
    },
});

export const { dispatch, getState } = store;
export const makeStore = () => store;