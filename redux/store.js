import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/redux/features/authSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        // Add other reducers as needed
    },
});

export const { dispatch, getState } = store;
export const makeStore = () => store;