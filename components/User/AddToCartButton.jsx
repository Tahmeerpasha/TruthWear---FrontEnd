'use client'
import { addToCart } from '@/lib/features/cartSlice'
import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const AddToCartButton = ({ product }) => {
    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()

    const handleAddToCart = (product, qty) => {
        setQuantity(qty)
        const prod = { product, qty: qty }
        dispatch(addToCart(prod))
    }

    return (
        <div>
            {
                quantity === 0 ?
                    <Button
                        ripple={false}
                        fullWidth={true}
                        className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                        onClick={() => handleAddToCart(product, quantity + 1)}
                    >
                        Add to Cart
                    </Button>
                    :
                    <div className='flex justify-between items-center w-full p-0'>
                        <Button onClick={() => handleAddToCart(product, quantity - 1)}>
                            -
                        </Button>
                        <span>{quantity}</span>
                        <Button onClick={() => handleAddToCart(product, quantity + 1)}>
                            +
                        </Button>
                    </div>
            }
        </div>
    )
}

export default AddToCartButton