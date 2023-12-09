import React from 'react'
import { Button } from '@material-tailwind/react';

const HorizontalCategories = ({ onSelectCategory, onClearFilter, categories }) => {
    return (
        <div className='flex'>
            <div className='flex items-center'>
                <Button
                    color='white'
                    variant='outlined'
                    size='lg'
                    className='focus:bg-black focus:text-white text-black hover:blur-none text-lg'
                    onClick={onClearFilter}
                >
                    All
                </Button>
            </div>
            <div className='flex flex-1 gap-7 p-6 justify-center rounded-xl'>
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