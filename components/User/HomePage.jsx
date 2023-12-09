'use client'
import React, { useState } from 'react'
import { CarouselTransition } from '../tailwind/CarouselTransition'
import HorizontalCategories from './HorizontalCategories'
import HomeProducts from './HomeProducts'

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };
    return (
        <div className=''>
            <CarouselTransition />
            <div>
                <p className='font-bold text-3xl mt-5 p-5'>Shop By Category</p>
                <HorizontalCategories onSelectCategory={handleCategorySelect} />
                <HomeProducts selectedCategory={selectedCategory} />
            </div>
        </div>
    )
}

export default HomePage