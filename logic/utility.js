import api from "./api";
export const addToCartApi = async (product, qty) => {
    try {
        const user = JSON.parse(localStorage.getItem('siteUser'));

        // Fetch user's cart
        const userCartResponse = await api.get(`shopping-carts/user/${user.id}`, { responseType: 'blob' });
        const cartId = JSON.parse(await userCartResponse.data.text())?.id;

        if (cartId !== undefined) {
            // Fetch the cart
            const cartResponse = await api.get(`shopping-carts/${cartId}`, { responseType: 'blob' });
            const cart = await JSON.parse(await cartResponse.data.text());

            if (cart !== undefined) {
                // Prepare cartItems with cart, product, and quantity
                const cartItems = {
                    cart: cart,
                    product: product,
                    quantity: qty
                };

                // Log the information for debugging
                console.log("Cart:", cart);
                console.log("CartItems:", cartItems);

                // Make the POST request to 'shopping-cart-items'
                const addToCartResponse = await api.post('shopping-cart-items', cartItems, { responseType: 'blob' });

                // Log the response for debugging
                console.log("Add to Cart Response:", addToCartResponse);

                return addToCartResponse;
            } else {
                console.log("Cart is undefined");
            }
        } else {
            console.log("Cart ID is undefined");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

export const getCartItemsApi = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('siteUser'));

        // Fetch user's cart
        const userCartResponse = await api.get(`shopping-carts/user/${user.id}`, { responseType: 'blob' });
        const cartId = JSON.parse(await userCartResponse.data.text())?.id;

        if (cartId !== undefined) {
            // Fetch the cart
            const cartResponse = await api.get(`shopping-carts/${cartId}`, { responseType: 'blob' });
            const cart = await JSON.parse(await cartResponse.data.text());
            if (cart !== undefined) {
                const getCartItems = await api.get(`shopping-cart-items/${cart.id}`);
                return getCartItems.data
            } else {
                console.log("Cart is undefined");
            }
        } else {
            console.log("Cart ID is undefined");
        }
    } catch (err) {
        console.error("An error occurred:", err);
    }
};