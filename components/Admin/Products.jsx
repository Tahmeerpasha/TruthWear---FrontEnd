'use client'
import React from 'react';
import { CardDefault } from '../tailwind/CardDefault';

const Products = ({ products }) => {

    return (
        <div className='w-full p-5 h-full gap-8 lg:gap-10 grid lg:grid-cols-3'>
            {Array.isArray(products) && products?.map(product => (
                <CardDefault productInfo={product} key={product.id} />
            ))}
        </div>
    );
};

export default Products;
