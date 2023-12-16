
// actions.js
import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
} from '@/lib/features/cartSlice';


export const addToCartRequest = () => ({
    type: ADD_TO_CART_REQUEST,
});

export const addToCartSuccess = (data) => ({
    type: ADD_TO_CART_SUCCESS,
    payload: data,
});

export const addToCartFailure = (error) => ({
    type: ADD_TO_CART_FAILURE,
    payload: error,
});
