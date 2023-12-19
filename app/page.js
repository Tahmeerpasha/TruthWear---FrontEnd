'use client'
import React, { useEffect, useState } from "react"
import { CarouselTransition } from "@/components/tailwind/CarouselTransition";
import HorizontalCategories from "@/components/User/HorizontalCategories";
import { ProductCards } from "@/components/tailwind/ProductCards";
import { useDispatch } from "react-redux";
import { hideLoading } from "@/lib/features/cartSlice";
import { fetchCategories, fetchProducts } from "@/api/utility";
import { Footer } from "@/components/tailwind/Footer";

const Page = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(hideLoading())
  }, [dispatch])


  const onClearFilter = () => {
    setSelectedCategory(null);
  };

  const loadProductsAndCategories = async (url) => {
    try {
      const returnedProducts = await fetchProducts(url);
      setProducts(returnedProducts);
      const returnedCategories = await fetchCategories();
      setCategories(returnedCategories);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const url = selectedCategory ? `/products/category/${selectedCategory}` : `/products`;
    loadProductsAndCategories(url);
  }, [selectedCategory])


  return (
    <>
      <div className="flex items-center justify-center">
        <CarouselTransition products={products} />
      </div>
      <div className="flex flex-col  items-center">
        <p className='font-bold text-3xl mt-5 p-5'>Shop By Category</p>
        <HorizontalCategories onSelectCategory={handleCategorySelect} onClearFilter={onClearFilter} categories={categories} />
        <ProductCards products={products} />
      </div>
      <Footer />
    </>
  )
}
export default Page