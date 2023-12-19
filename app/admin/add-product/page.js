'use client'
import AddProducts from '@/components/Admin/AddProducts'
import Categories from '@/components/Admin/Categories'
import api from '@/api/api'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    api.defaults.responseType = "json";
    products, error, loading

    const fetchCategories = async () => {
        try {
            const response = await api.get(`/product-categories`)
            const data = await response.data;
            setCategories(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProducts = async (url) => {
        try {
            setLoading(true);
            const response = await api.get(url)

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.data;
            console.log(data)
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    const onClearFilter = () => {
        setSelectedCategory(null);
    };

    useEffect(() => {
        const url = selectedCategory
            ? `/products/category/${selectedCategory}`
            : `/products`;
        fetchProducts(url);
        fetchCategories();
    }, [selectedCategory])


    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };
    return (
        <div className='flex'>
            <Categories fetchProducts={fetchProducts} onSelectCategory={handleCategorySelect} onClearFilter={onClearFilter} categories={categories} fetchCategories={fetchCategories} />
            <AddProducts selectedCategory={selectedCategory} />
        </div>
    )
}

export default Page