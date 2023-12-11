import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/lib/features/cartSlice'
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        // Add other reducers as needed
    },
});

export const { dispatch, getState } = store;
export const makeStore = () => store;