import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        // auth: productsReducer,
        // Add other reducers as needed
    },
});

export const { dispatch, getState } = store;
export const makeStore = () => store;