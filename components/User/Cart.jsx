'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { ListWithIcon } from '../tailwind/ListWithIcon'
import CartSummary from './CartSummary'

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart)
    return (
        <div>
            {cartItems.length <= 0 ?
                <div>
                    No Items in cart
                </div>
                :
                cartItems.map(
                    (item) => {
                        return (
                            <>
                                <ListWithIcon item={item} />
                            </>
                        )
                    }
                )
            }
            <CartSummary />
        </div>
    )
}

export default Cart