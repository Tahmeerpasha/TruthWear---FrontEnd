import HomeProductImage from "../User/HomeProductImage";
import { useDispatch } from "react-redux";
import { addToCartAsync, removeFromCart } from "@/lib/features/cartSlice";
import { useEffect } from "react";


export function ListWithIcon({ item }) {
    console.log(item)
    const dispatch = useDispatch()
    const product = item.product
    const handleAddToCart = (qty) => {
        const quantity = qty === 0 ? -1 : 1
        dispatch(addToCartAsync(product, quantity))
    }

    useEffect(() => {
        if (item.qty <= 0) {
            dispatch(removeFromCart(product))
        }
    }, [item.qty])

    return (
        <div>
            {item.qty <= 0 ? (
                <div>No Items in cart</div>
            ) : (
                <div className="flex flex-wrap items-center mb-6  -mx-4 md:mb-8">
                    <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                        <div className="flex flex-wrap items-center -mx-4">
                            <div className="w-full px-4 mb-3 md:w-1/3">
                                <div className="w-full h-96 md:h-24 md:w-24">
                                    <HomeProductImage style={'h-[30%] w-auto rounded-xl p-2 bg-gray-300'} productInfo={item?.product} />

                                </div>
                            </div>
                            <div className="w-2/3 px-4">
                                <h2 className="mb-2 text-xl font-bold dark:text-gray-400">{product.productName}</h2>
                                <p className="text-gray-500 dark:text-gray-400 ">{product?.category?.categoryName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden px-4 lg:block lg:w-2/12">
                        <p className="text-lg font-bold text-black dark:text-gray-400">₹{product.price}</p>
                        <span className="text-xs text-gray-500 line-through dark:text-gray-400">₹1500</span>
                    </div>
                    <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                        <div
                            className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
                            <button className="py-2 hover:text-gray-700 dark:text-gray-400" onClick={() => handleAddToCart(0)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                </svg>
                            </button>
                            <input type="number"
                                disabled
                                className="w-12 px-2 py-4 text-center border-0 rounded-md text-black dark:bg-gray-800 bg-gray-50 dark:text-gray-400 md:text-right"
                                placeholder={item.qty} />
                            <button className="py-2 hover:text-gray-700 dark:text-gray-400" onClick={() => handleAddToCart(1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                        <p className="text-lg font-bold text-black dark:text-gray-400">₹{product?.price * item?.qty}</p>
                    </div>
                </div>
            )}
        </div>
    );
}