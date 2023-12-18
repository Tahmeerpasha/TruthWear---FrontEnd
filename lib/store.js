import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/lib/features/cartSlice'
import cardReducer from '@/lib/features/cardSlice'
import userReducer from '@/lib/features/userSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        card: cardReducer,
        user: userReducer,
        // Add other reducers as needed
    },
});

export const { dispatch, getState } = store;
export const makeStore = () => store;