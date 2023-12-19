'use client'
import React, { useState } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import api from '@/api/api';

const Categories = ({ fetchProducts, onSelectCategory, onClearFilter, categories, fetchCategories }) => {
    console.log(categories);
    api.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editableCategory, setEditableCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleUpdate = async (categoryId) => {
        try {
            const response = await api.put(`/product-categories/${categoryId}`, JSON.stringify({ categoryName: newCategoryName }));
            console.log(response);
            fetchCategories();
            setEditableCategory(null);
            setNewCategoryName('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            await api.delete(`/product-categories/${categoryId}`)
            fetchCategories();
            fetchProducts();
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
            const response = await api.post(`/product-categories`, JSON.stringify({ categoryName: newCategoryName }))
            console.log(response)
            setNewCategoryName('');
            fetchCategories();
        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <div className='w-[20%] min-h-screen bg-black text-center text-white'>
            <span className='underline text-3xl'>Categories</span>

            <ul className='text-xl pl-3 pt-4 pr-3'>
                <li
                    className='p-3 pb-2 pt-2 w-full flex items-center rounded-xl hover:cursor-pointer text-white '
                    onClick={onClearFilter}
                >
                    All
                </li>
                {Array.isArray(categories) && categories?.map((category) => (
                    <>
                        <li
                            key={category.id}
                            className={`p-2 w-full flex items-center rounded-xl hover:cursor-pointer ${selectedCategory === category.id ? 'bg-gray-500' : ''}`}
                            onClick={() => {
                                setSelectedCategory(category.id);
                                onSelectCategory(category.categoryName); // Notify the parent about the selected category
                            }}
                        >
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
                                    {<>
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
                                    </>}
                                </div>
                            )}
                        </li>
                    </>
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
