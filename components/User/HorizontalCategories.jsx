'use client'
import api from '@/logic/api';
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'

const HorizontalCategories = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        try {
            const response = await api.get(`/product-categories`)
            const data = await response.data;
            setCategories(data);
            console.log(JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className='flex flex-1 gap-7 p-6 justify-center rounded-xl'>
            {categories?.map(category => {
                return (
                    <div key={category.id}>
                        <Button
                            color='white'
                            variant='outlined'
                            size='lg'
                            className='focus:bg-black focus:text-white text-black hover:blur-none text-lg'
                            onClick={() => onSelectCategory(category.categoryName)}
                        >
                            {category.categoryName}
                        </Button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default HorizontalCategories