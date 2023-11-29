'use client'
import React, { useState, useEffect } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { SECRET_KEY } from './config';

const Categories = ({ onSelectCategory }) => {

    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editableCategory, setEditableCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleUpdate = async (categoryId) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${SECRET_KEY}`,
                },
                body: JSON.stringify({ categoryName: newCategoryName }),
            };

            const response = await fetch(
                `http://localhost:8080/api/v1/product-categories/${categoryId}`,
                requestOptions
            );

            if (!response.ok) {
                throw new Error('Update not possible');
            }

            setEditableCategory(null);
            setNewCategoryName('');
            fetchCategories();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${SECRET_KEY}`,
                },
            };

            const response = await fetch(
                `http://localhost:8080/api/v1/product-categories/${categoryId}`,
                requestOptions
            );

            if (!response.ok) {
                throw new Error('Delete not possible');
            }

            fetchCategories();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (categoryId, categoryName) => {
        setEditableCategory(categoryId);
        setNewCategoryName(categoryName);
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();

        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${SECRET_KEY}`,
                },
                body: JSON.stringify({ categoryName: newCategoryName }),
            };

            const response = await fetch(
                'http://localhost:8080/api/v1/product-categories',
                requestOptions
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setNewCategoryName('');
            fetchCategories();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/api/v1/product-categories',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setCategories(data);
                console.log(JSON.stringify(data));
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const handleSelectedCategory = (categoryName) => {
    //     return (
    //         <AddProducts name={categoryName} />
    //     )
    // }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className='w-[20%] min-h-screen bg-black text-center text-white'>
            <span className='underline text-3xl'>Categories</span>
            <ul className='text-xl pl-3 pt-4 pr-3'>
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className={`p-2 w-full flex items-center rounded-xl hover:cursor-pointer ${selectedCategory === category.id ? 'bg-gray-500' : ''}`}
                        onClick={() => {
                            setSelectedCategory(category.id);
                            onSelectCategory(category.categoryName); // Notify the parent about the selected category
                        }}                    >
                        {editableCategory === category.id ? (
                            <>
                                <input
                                    type='text'
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder='Edit Category'
                                    className='p-1 w-40 mr-2 text-black rounded-xl'
                                />
                                <button
                                    className='text-black w-fit rounded-xl bg-black'
                                    onClick={() => handleUpdate(category.id)}
                                >
                                    <GiConfirmed fill='white' />
                                </button>
                            </>
                        ) : (
                            <div className='flex'>
                                <button>
                                    <span className='p-1'>{category.categoryName}</span>
                                </button>
                                <CiEdit
                                    className='text-white p-1'
                                    size={30}
                                    onClick={() => handleEdit(category.id, category.categoryName)}
                                ></CiEdit>
                                <MdDeleteOutline
                                    className='text-white p-1'
                                    size={30}
                                    onClick={() => handleDelete(category.id)}
                                ></MdDeleteOutline>
                            </div>
                        )}
                    </li>
                ))}
                <li className='p-2 flex items-center'>

                    <input
                        type='text'
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder='New Category'
                        className='p-1 w-40 mr-2 text-black rounded-xl'
                    />
                    <button
                        className='text-black rounded-xl p-1 bg-white'
                        onClick={(e) => handleAddCategory(e)}
                    >
                        <span className='p-5'>+</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Categories;
