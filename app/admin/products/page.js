'use client'
import Categories from '@/components/Categories'
import Products from '@/components/Products'
import React, { useState } from 'react'

const Page = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };
    return (
        <div className='flex'>
            <Categories onSelectCategory={handleCategorySelect} />
            <Products selectedCategory={selectedCategory} />
        </div>
    )
}

export default Page