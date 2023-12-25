'use client'
import Categories from '@/components/Admin/Categories'
import Products from '@/components/Admin/Products'
import api from '@/api/api'
import { Spinner } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

const Page = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    api.defaults.responseType = "json";

    const onClearFilter = () => {
        setSelectedCategory(null);
    };

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
    };

    useEffect(() => {
        const fetchData = async () => {
            const url = selectedCategory
                ? `/products/category/${selectedCategory}`
                : `/products`;
            await fetchCategories();
            await fetchProducts(url);
        }
        fetchData();
    }, [selectedCategory]);



    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };


    if (loading) {
        return <div><Spinner /></div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='flex'>
            <Categories fetchProducts={fetchProducts} categories={categories} fetchCategories={fetchCategories} onClearFilter={onClearFilter} onSelectCategory={handleCategorySelect} />
            <Products products={products} />
        </div>
    )
}

export default Page