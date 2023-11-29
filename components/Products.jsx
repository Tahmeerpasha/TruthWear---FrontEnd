// config.js

// Products.js
import React, { useEffect, useState } from 'react';
import { SECRET_KEY } from './config';
import { CardDefault } from './tailwind/CardDefault';
import { BASE_URL } from './config';

const Products = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async (url) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + SECRET_KEY);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const url = selectedCategory
            ? `${BASE_URL}/products/category/${selectedCategory}`
            : `${BASE_URL}/products`;

        fetchProducts(url);
    }, [selectedCategory]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='w-full h-fit gap-2 grid grid-cols-3'>
            {products.map(product => (
                <CardDefault productInfo={product} key={product.id} />
            ))}
        </div>
    );
};

export default Products;
