// // middleware.js
// import { addToCartRequest, addToCartSuccess, addToCartFailure } from "@/lib/actions";
// import Cookies from "js-cookie";
// import { addToCartApi } from "@/logic/utility";

// const cartApiMiddleware = (store) => (next) => async (action) => {
//     if (action.type === 'ADD_TO_CART_ASYNC') {
//         try {
//             store.dispatch(addToCartRequest());
//             const { product, qty } = action.payload;
//             // Use addToCartApi and extract data from the response
//             const response = await addToCartApi(product, qty);
//             store.dispatch(addToCartSuccess(response.data));
//             const state = store.getState().cart;
//             Cookies.set('cart', JSON.stringify(state));
//         } catch (error) {
//             store.dispatch(addToCartFailure(error.message));
//         }
//     }

//     return next(action);
// };

// export default cartApiMiddleware;
