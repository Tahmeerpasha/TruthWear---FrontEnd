import React from 'react';
import { Tab, TabsHeader } from '@material-tailwind/react';

const HorizontalCategories = ({ onSelectCategory, onClearFilter, categories }) => {
    return (
        <TabsHeader className='max-w-full'>
            {categories?.length > 0 && (
                <Tab key="all" value="All" onClick={onClearFilter}>
                    All
                </Tab>
            )}

            {Array.isArray(categories) &&
                categories.map((category) => (
                    <Tab key={category.id} value={category.categoryName} onClick={() => onSelectCategory(category.categoryName)}>
                        {category.categoryName}
                    </Tab>
                ))}
        </TabsHeader>
    );
};

export default HorizontalCategories;
