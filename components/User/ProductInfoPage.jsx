'use client'
import api from '@/api/api'
import React, { useEffect, useState } from 'react'
import Images from '../Images'
import AddToCartButton from './AddToCartButton'
import { Button } from '@material-tailwind/react'

const ProductInfoPage = ({ id }) => {
    const [product, setProduct] = useState([])
    const fetchProducts = async () => {
        api.defaults.responseType = 'json'
        const res = await api.get(`/products/${id}`)
        const data = res.data
        console.log(data)
        setProduct(data)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className="bg-gray-100 pt-20 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        {/* <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <Images productInfo={product} />
                        </div> */}
                        <div className="max-h-fit rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 ">
                            <Images productInfo={product} />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <AddToCartButton product={product} />
                            </div>
                            <div className="w-1/2 px-2">
                                <Button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</Button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product?.productName}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {product?.description}
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                <span className="text-gray-600 dark:text-gray-300">Rs.{product?.price}/-</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                            <div className="flex items-center mt-2">
                                <Button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></Button>
                                <Button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></Button>
                                <Button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></Button>
                                <Button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></Button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                            <div className="flex items-center mt-2">
                                <Button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</Button>
                                <Button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</Button>
                                <Button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</Button>
                                <Button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</Button>
                                <Button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</Button>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {product?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductInfoPage