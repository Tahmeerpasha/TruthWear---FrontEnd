import { clearCart } from '@/lib/features/cartSlice';
import { Button } from '@material-tailwind/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CartSummary = () => {

    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(cart);
    }, [cart]);

    const checkout = async () => {
        await fetch("http://localhost:3000/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ products: cart }),
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response);
                if (response.url === 'http://localhost:3000/success')
                    dispatch(clearCart())
                if (response.url) {
                    window.location.href = response.url;
                    console.log(response.url);
                }
            });
    };

    return (
        <div classNameName='p-5'>
            {cart.itemPrice > 0 ?
                <>
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full px-4 mb-4  ">
                            <div className="p-6 border dark:bg-gray-900 dark:border-gray-900 bg-gray-50 md:p-8">
                                <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-gray-400">Order Summary</h2>
                                <div
                                    className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                                    <span className="text-gray-700 dark:text-gray-400">Subtotal</span>
                                    <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">Rs.{cart.itemPrice}/-</span>
                                </div>
                                <div className="flex items-center justify-between pb-4 mb-4 ">
                                    <span className="text-gray-700 dark:text-gray-400 ">Tax</span>
                                    <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">Rs.{cart.taxPrice}/-</span>
                                </div>
                                <div className="flex items-center justify-between pb-4 mb-4 ">
                                    <span className="text-gray-700 dark:text-gray-400 ">Shipping</span>
                                    <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">{cart.shippingPrice != 0 ? `Rs.${cart.shippingPrice}/-` : 'Free'}</span>
                                </div>
                                <div className="flex items-center justify-between pb-4 mb-4 ">
                                    <span className="text-gray-700 dark:text-gray-400">Order Total</span>
                                    <span className="text-xl font-bold text-gray-700 dark:text-gray-400">Rs.{cart.totalPrice}/-</span>
                                </div>
                                <h2 className="text-lg text-gray-500 dark:text-gray-400">We offer:</h2>
                                <div className="flex items-center gap-2 mb-4 " >
                                    <a href="#">
                                        <img src="https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png" alt=""
                                            className="object-cover h-16 w-26" />
                                    </a>
                                    <a href="#">
                                        <img src="https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png" alt=""
                                            className="object-cover h-16 w-26" />
                                    </a>
                                    <a href="#">
                                        <img src="https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png" alt=""
                                            className="object-cover h-16 w-26" />
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center justify-between ">
                                <Button onClick={checkout}
                                    className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-black rounded-md hover:bg-blue-600">Checkout</Button>
                            </div>
                        </div>
                    </div>
                </>
                : ''}
        </div>
    )
}

export default CartSummary