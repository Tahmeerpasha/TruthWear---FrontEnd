'use client'
import React, { useEffect, useState } from "react"
import { CarouselTransition } from "@/components/tailwind/CarouselTransition";
import HorizontalCategories from "@/components/User/HorizontalCategories";
import { ProductCards } from "@/components/tailwind/ProductCards";
import { useDispatch } from "react-redux";
import { hideLoading } from "@/lib/features/cartSlice";
import { fetchCategories, fetchProducts } from "@/api/utility";
import { Footer } from "@/components/tailwind/Footer";
import { DefaultPagination } from "@/components/tailwind/DefaultPagination";
import { Tabs } from "@material-tailwind/react";

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
      <div className="lg:flex items-center justify-center">
        <CarouselTransition />
      </div>
      <div className="flex flex-col p-1 items-center">
        <p className='font-bold text-3xl mt-5 p-5'>Shop By Category</p>
        <Tabs>
          <HorizontalCategories onSelectCategory={handleCategorySelect} onClearFilter={onClearFilter} categories={categories} />
          <ProductCards products={products} />
        </Tabs>
      </div>
      <div className="w-full flex justify-center items-center p-10">
        <DefaultPagination />
      </div>
      <Footer />
    </>
  )
}
export default Page