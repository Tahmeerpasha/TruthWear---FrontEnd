import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2) // 12.3456 to 12.35
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

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existingItem = state.cartItems.find((x) => x.product.id === item.product.id)

            if (existingItem)
                state.cartItems = state.cartItems.map((x) => x.product.id === existingItem.product.id ? item : x)
            else
                state.cartItems = [...state.cartItems, item]

            state.itemPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
            )
            state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 100)
            state.taxPrice = addDecimals(Number((0.15 * state.itemPrice)))
            state.totalPrice = (
                Number(state.itemPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            )
            Cookies.set('cart', JSON.stringify(state))
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
            Cookies.set('cart', JSON.stringify(state));
        },

        hideLoading: (state) => {
            state.loading = false
        },
    }
})

export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions

export default cartSlice.reducer
