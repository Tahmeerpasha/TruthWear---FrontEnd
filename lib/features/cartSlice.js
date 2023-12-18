// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { addToCartFailure, addToCartRequest, addToCartSuccess } from "@/lib/actions";
import { addToCartApi, getCartItemsApi } from "@/logic/utility";

// export cart actions
export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}


export const addToCartAsync = (product, qty) => async (dispatch) => {
    try {
        dispatch(addToCartRequest());
        console.log("Product:", product);
        const response = await addToCartApi(product, qty);
        console.log(response.data)
        const cartResponse = await JSON.parse(await response.data.text())
        console.log("Response:", cartResponse)
        dispatch(addToCart({ product, qty }));
        console.log("Cart:", await JSON.parse(await response.data.text()));
        dispatch(addToCartSuccess(await JSON.parse(await response.data.text())));
        // Handle cookie update separately
        dispatch(updateCartInCookie());
    } catch (error) {
        console.log(error)
        dispatch(addToCartFailure(error.message));
    }
};

export const getCartItemsAsync = () => async (dispatch) => {
    try {
        dispatch(addToCartRequest());
        const response = await getCartItemsApi();
        dispatch(addToCartSuccess(response));
        return response.data
    } catch (error) {
        dispatch(addToCartFailure(error.message));
    }
};

const updateCartInCookie = () => (dispatch, getState) => {
    const state = getState().cart;
    Cookies.set('cart', JSON.stringify(state));
};
const initialState =
    Cookies.get('cart')
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

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const cartItem = action.payload;
            console.log("Cart Item:", cartItem);
            const existingItemIndex = state.cartItems.findIndex(
                (x) => x.product.id === cartItem.product.id
            );

            if (existingItemIndex !== -1) {
                // If item already exists, update the quantity
                state.cartItems[existingItemIndex].qty += cartItem.qty;
            } else {
                // If item is not in the cart, add it
                state.cartItems.push(cartItem);
            }

            state.itemPrice = addDecimals(
                state.cartItems.reduce(
                    (acc, item) => acc + item.product.price * item.qty,
                    0
                )
            );
            state.shippingPrice = addDecimals(
                state.itemPrice > 100 ? 0 : 100
            );
            state.taxPrice = addDecimals(Number(0.15 * state.itemPrice));
            state.totalPrice =
                Number(state.itemPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice);
        },


        removeFromCart: (state, action) => {
            const productIdToRemove = action.payload.id;

            // Remove the item from the cart based on the product ID
            state.cartItems = state.cartItems.filter(
                (item) => item.product.id !== productIdToRemove
            );

            state.itemPrice = addDecimals(
                state.cartItems.reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                )
            );
            state.shippingPrice = addDecimals(
                state.itemPrice > 100 ? 0 : 100
            );
            state.taxPrice = addDecimals(Number(0.15 * state.itemPrice));
            state.totalPrice =
                Number(state.itemPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice);
        },

        hideLoading: (state) => {
            state.loading = false;
        },
    },
});


export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions;

export default cartSlice.reducer;
