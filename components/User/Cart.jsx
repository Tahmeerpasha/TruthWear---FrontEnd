'use client';
import React from 'react';
import { ListWithIcon } from '../tailwind/ListWithIcon';
import CartSummary from './CartSummary';
import { useSelector } from 'react-redux';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    return (
        <section className="py-2 bg-gray-100 font-poppins dark:bg-gray-700">
            <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
                <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">Your Cart</h2>
                <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 dark:border-gray-800">
                    <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-8">
                        <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Product name</h2>
                        </div>
                        <div className="hidden px-4 lg:block lg:w-2/12">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Price</h2>
                        </div>
                        <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Quantity</h2>
                        </div>
                        <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400"> Subtotal</h2>
                        </div>
                    </div>
                    <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
                        {cartItems.length <= 0 ? (
                            <div>No Items in cart</div>
                        ) : (
                            cartItems.map((item) => <ListWithIcon key={item.id} item={item} />)
                        )}
                        <CartSummary />
                    </div>
                </div>
            </div>
        </section >

    );
};

export default Cart;
