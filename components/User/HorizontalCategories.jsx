import React from 'react'
import { Button } from '@material-tailwind/react';

const HorizontalCategories = ({ onSelectCategory, onClearFilter, categories }) => {
    return (
        <div className='flex'>
            <div className='lg:flex hidden items-center'>
                {categories.length > 0 && <Button
                    color='white'
                    variant='outlined'
                    size='lg'
                    className='focus:bg-black focus:text-white text-black hover:blur-none text-lg'
                    onClick={onClearFilter}
                >
                    All
                </Button>}
            </div>
            {<div className='lg:hidden'>
                <select
                    className='max-w-full p-2 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-black'
                    onChange={(e) => onSelectCategory(e.target.value)}
                >
                    <option value=''>All</option>
                    {Array.isArray(categories) && categories?.map(category => {
                        return (
                            <option key={category.id} value={category.categoryName}>{category.categoryName}</option>
                        )
                    })}
                </select>
            </div>}
            <div className=' flex-1 gap-7 hidden lg:flex p-6 justify-center rounded-xl'>
                {Array.isArray(categories) && categories?.map(category => {
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
                })}
            </div>
        </div>
    )
}

export default HorizontalCategories