import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/lib/features/cartSlice'
import userReducer from '@/lib/features/userSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        // Add other reducers as needed
    },
});

export const { dispatch, getState } = store;
export const makeStore = () => store;