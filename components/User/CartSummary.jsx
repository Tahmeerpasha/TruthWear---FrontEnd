import { Button } from '@material-tailwind/react'
import React from 'react'
import { useSelector } from 'react-redux'

const CartSummary = () => {
    const cart = useSelector((state) => state.cart)
    return (
        <div className='p-5'>
            <span className='p-2 underline text-black text-3xl font-bold'>Order Summary</span>
            <div className='flex flex-col p-5'>
                <div className='grid grid-cols-2 justify-end'>
                    <span className=''>Total Items Price:</span>
                    <span className=''> Rs.{cart.itemPrice}/-</span>
                </div>
                <div className='grid grid-cols-2'>
                    <span>Tax Cost: </span>
                    <span>Rs.{cart.taxPrice}/-</span>
                </div>
                <div className='grid grid-cols-2'>
                    <span>Shipping Price:</span>
                    <span> Rs.{cart.shippingPrice}/-</span>
                </div>
                <div className='grid grid-cols-2'>
                    <span>Total Price:</span>
                    <span> Rs.{cart.totalPrice}/-</span>
                </div>
            </div>
            <Button className='w-full'>Checkout</Button>
        </div>
    )
}

export default CartSummary