'use client';
import React from 'react';
import { ListWithIcon } from '../tailwind/ListWithIcon';
import CartSummary from './CartSummary';
import { useSelector } from 'react-redux';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    // const dispatch = useDispatch();

    // const fetchCartItems = async () => {
    //     dispatch(getCartItemsAsync());
    // };

    // useEffect(() => {
    //     fetchCartItems();
    // }, [dispatch]);

    return (
        <div>
            {cartItems.length <= 0 ? (
                <div>No Items in cart</div>
            ) : (
                cartItems.map((item) => <ListWithIcon key={item.id} item={item} />)
            )}
            <CartSummary />
        </div>
    );
};

export default Cart;
