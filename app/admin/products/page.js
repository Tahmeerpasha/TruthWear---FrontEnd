'use client'
import Categories from '@/components/Admin/Categories'
import Products from '@/components/Admin/Products'
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