import React from 'react'
import { HomeProductCard } from '../tailwind/HomeProductCard'

const HomeProducts = async ({ selectedCategory }) => {
    return (
        <div className=''>
            <HomeProductCard selectedCategory={selectedCategory} />
        </div>
    )
}

export default HomeProducts