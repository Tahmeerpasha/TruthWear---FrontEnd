'use client';
import React, { useState, useEffect } from 'react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        // Perform the POST request to create a new category
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWdoZWVyYWhhbWFkQGdtYWlsLmNvbSIsImlhdCI6MTcwMDM4OTgzMywiZXhwIjoxNzAwNDI1ODMzfQ.t5JnXK9txjm1IfosSCp4UEhQpEyzHpmuIE9AGsg78tk',
            },
            body: JSON.stringify({ categoryName: newCategoryName }),
        };

        fetch("http://localhost:8080/api/v1/product-categories", requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Refresh the categories list after successful creation
                setNewCategoryName('');
                return fetchCategories();
            })
            .catch(error => console.error('Error:', error));
    };

    const fetchCategories = () => {
        const axios = require('axios');

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/api/v1/product-categories',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWdoZWVyYWhhbWFkQGdtYWlsLmNvbSIsImlhdCI6MTcwMDM5NTg3MSwiZXhwIjoxNzAwNDMxODcxfQ.jHkb2R_uVgKOw4mVxiKBmXr3BtFFBXowfMnGEOfhEK0',
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                setCategories(response.data);
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        // Initial fetch of categories
        fetchCategories();
    }, []);

    return (
        <div className='w-[20%] min-h-screen bg-black text-white'>
            <span className='text-center text-3xl'>Categories</span>
            <ul className='text-xl pl-3 pt-4'>
                {categories.map(category => (
                    <li key={category.id} className='p-2 flex items-center'>
                        <span className='p-1'>{category.categoryName}</span>
                    </li>
                ))}
                <li className='p-2 flex items-center'>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="New Category"
                        className="p-1 w-40 mr-2 text-black rounded-sm"
                    />
                    <button className='text-black rounded-xl p-1 bg-white' onClick={(e) => handleAddCategory(e)}><span className='p-5'>Add</span></button>
                </li>
            </ul>
        </div>
    );
};

export default Categories;
