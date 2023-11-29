'use client'
import React, { useEffect, useState } from 'react';
import { SECRET_KEY } from './config';
import { CardDefault } from './tailwind/CardDefault';

const Products = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + SECRET_KEY);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            const response = await fetch("http://localhost:8080/api/v1/products", requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className=' w-full h-fit gap-2 grid grid-cols-3'>
            {products.map(product => {
                return (
                    <CardDefault productInfo={product} key={product.id} />
                )
            })}
        </div>
    );
};

export default Products;
