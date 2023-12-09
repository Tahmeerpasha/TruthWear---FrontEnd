// config.js
'use client'
// Products.js
import React, { useEffect, useState } from 'react';
import { CardDefault } from '../tailwind/CardDefault';
import api from '@/logic/api';
import { Spinner } from '@material-tailwind/react';

const Products = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async (url) => {
        try {
            setLoading(true);
            const response = await api.get(url)

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.data;
            console.log(data)
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const url = selectedCategory
            ? `/products/category/${selectedCategory}`
            : `/products`;

        fetchProducts(url);
    }, [selectedCategory]);


    if (loading) {
        return <div><Spinner /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='w-full h-fit gap-2 grid grid-cols-3'>
            {products?.map(product => (
                <CardDefault productInfo={product} key={product.id} />
            ))}
        </div>
    );
};

export default Products;
