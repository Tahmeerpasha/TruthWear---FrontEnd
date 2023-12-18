
// actions.js
import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
} from '@/lib/features/cartSlice';

import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS
} from '@/lib/features/userSlice'

// Cart actions
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

// User actions
export const loginUserRequest = () => ({
    type: LOGIN_USER_REQUEST,
});

export const loginUserSuccess = (data) => ({
    type: LOGIN_USER_SUCCESS,
    payload: data,
});

export const loginUserFailure = (error) => ({
    type: LOGIN_USER_FAILURE,
    payload: error,
});

export const logoutUserRequest = () => ({
    type: LOGOUT_USER_REQUEST,
});

export const logoutUserSuccess = (data) => ({
    type: LOGOUT_USER_SUCCESS,
    payload: data,
});

export const logoutUserFailure = (error) => ({
    type: LOGOUT_USER_FAILURE,
    payload: error,
});
