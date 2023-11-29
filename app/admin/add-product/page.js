'use client'
import AddProducts from '@/components/AddProducts'
import Categories from '@/components/Categories'
import React, { useState } from 'react'

const Page = () => {

    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };
    return (
        <div className='flex'>
            <Categories onSelectCategory={handleCategorySelect} />
            <AddProducts selectedCategory={selectedCategory} />
        </div>
    )
}

export default Page