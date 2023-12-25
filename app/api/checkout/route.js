import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getActiveProducts = async () => {
    const checkProducts = await stripe.products.list();
    const availableProducts = checkProducts.data.filter(
        (product) => product.active === true
    );
    return availableProducts;
};

export const POST = async (request) => {
    const { products } = await request.json();
    const data = products?.cartItems;

    let activeProducts = await getActiveProducts();

    try {
        for (const productItem of data) {
            const stripeProduct = activeProducts?.find(
                (stripeProduct) =>
                    stripeProduct?.name?.toLowerCase() == productItem?.product?.productName?.toLowerCase()
            );

            if (stripeProduct == undefined) {
                await stripe.products.create({
                    name: productItem?.product?.productName,
                    default_price_data: {
                        unit_amount: productItem?.product?.price * 100,
                        currency: "inr",
                    },
                });
            }
        }
    } catch (error) {
        console.error("Error in creating a new product", error);
        throw error;
    }

    activeProducts = await getActiveProducts();
    let stripeItems = [];

    for (const productItem of data) {
        const stripeProduct = activeProducts?.find(
            (prod) => prod?.name?.toLowerCase() == productItem?.product?.productName?.toLowerCase()
        );

        if (stripeProduct) {
            stripeItems.push({
                price: stripeProduct?.default_price,
                quantity: productItem?.qty,
            });
        }
    }

    const session = await stripe.checkout.sessions.create({
        line_items: stripeItems,
        mode: "payment",
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return NextResponse.json({ url: session.url });
};