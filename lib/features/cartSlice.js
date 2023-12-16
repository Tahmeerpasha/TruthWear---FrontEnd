// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { addToCartFailure, addToCartRequest, addToCartSuccess } from "@/lib/actions";
import { addToCartApi } from "@/logic/utility";

// cartSlice.js
export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const initialState = Cookies.get('cart')
    ? { ...JSON.parse(Cookies.get('cart')), loading: true }
    : {
        loading: true,
        cartItems: [],
        paymentMethod: '',
        shippingPrice: 0,
        itemPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
    }

export const addToCartAsync = (product, qty) => async (dispatch) => {
    try {
        dispatch(addToCartRequest());
        console.log("Product:", product);
        const response = await addToCartApi(product, qty);
        console.log("Response:", await JSON.parse(await response.data.text()))
        dispatch(addToCart(product, qty));
        dispatch(addToCartSuccess(await JSON.parse(await response.data.text())));
        // Handle cookie update separately
        dispatch(updateCartInCookie());
    } catch (error) {
        dispatch(addToCartFailure(error.message));
    }
};

const updateCartInCookie = () => (dispatch, getState) => {
    const state = getState().cart;
    Cookies.set('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItemIndex = state.cartItems.findIndex(x => x.product.id === item.product.id);

            if (existingItemIndex !== -1) {
                state.cartItems = [
                    ...state.cartItems.slice(0, existingItemIndex),
                    item,
                    ...state.cartItems.slice(existingItemIndex + 1),
                ];
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            state.itemPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
            );
            state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 100);
            state.taxPrice = addDecimals(Number(0.15 * state.itemPrice));
            state.totalPrice = (
                Number(state.itemPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            );
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x.product.id !== action.payload.id);
            state.itemPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
            );
            state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 100);
            state.taxPrice = addDecimals(Number((0.15 * state.itemPrice)));
            state.totalPrice = (
                Number(state.itemPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            );
        },

        hideLoading: (state) => {
            state.loading = false;
        },
    }
});

export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions;

export default cartSlice.reducer;
