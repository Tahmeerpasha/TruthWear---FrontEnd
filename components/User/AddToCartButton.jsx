// Import statements
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCartAsync } from '@/lib/features/cartSlice';
import { Button } from '@material-tailwind/react';

// Component definition
const AddToCartButton = ({ product }) => {
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();

    const handleAddToCart = (qty) => {
        qty === 0 ? setQuantity(quantity - 1) : setQuantity(quantity + 1);
        dispatch(addToCartAsync(product, qty));
    };

    return (
        <div>
            {quantity === 0 ? (
                <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    onClick={() => handleAddToCart(1)}
                >
                    Add to Cart
                </Button>
            ) : (
                <div className="flex justify-between items-center w-full p-0">
                    <Button
                        onClick={() => handleAddToCart(0)}
                    >-</Button>
                    <span>{quantity}</span>
                    <Button onClick={() => handleAddToCart(1)}>+</Button>
                </div>
            )}
        </div>
    );
};

// Export the component
export default AddToCartButton;
