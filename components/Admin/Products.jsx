'use client'
import React from 'react';
import { CardDefault } from '../tailwind/CardDefault';

const Products = ({ products }) => {

    return (
        <div className='w-full h-fit gap-2 grid grid-cols-3'>
            {Array.isArray(products) && products?.map(product => (
                <CardDefault productInfo={product} key={product.id} />
            ))}
        </div>
    );
};

export default Products;
