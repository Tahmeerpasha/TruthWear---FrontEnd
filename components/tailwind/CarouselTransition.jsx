'use client'
import { Carousel, Spinner } from "@material-tailwind/react";
import { React, Suspense, useEffect, useState } from "react";
import Images from "../Images";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/api/utility";

export function CarouselTransition() {
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        return await fetchProducts('/products')
    }
    useEffect(() => {
        getProducts().then(res => {
            setProducts(res)
        })
    }, [])
    const router = useRouter();
    const handleClick = (id) => {
        console.log(id)
        router.push(`/product-info/${id}`)
    }

    return (
        <Suspense fallback={<Spinner />}>
            <Carousel transition={{ duration: 2 }} className="lg:rounded-xl overflow-hidden lg:w-full lg:mx-10 bg-black lg:mt-4 h-[300px] lg:h-full lg:py-3" loop autoplay>
                {products.length > 0 && products?.map(product => {
                    return (
                        <div className="lg:max-h-[400px] flex  justify-between" key={product.id} onClick={() => handleClick(product.id)}>
                            <div className="flex flex-col text-white">
                                <p className="lg:text-4xl md:text-2xl p-5 underline">Our Newest Collections</p>
                                <div className="lg:p-10 p-5 flex flex-col justify-center lg:justify-start">
                                    <h1 className="lg:text-3xl md:text-2xl x-10">{product.productName}</h1>
                                    <h1 className="text-md hidden lg:flex py-5">{product.description}</h1>
                                    <h1 className="lg:text-xl ">Only Rs.{product.price}/-</h1>
                                </div>
                            </div>
                            <div className="">
                                <Images productInfo={product} key={product.id} />
                            </div>
                        </div>
                    )
                })}
            </Carousel>
        </Suspense>
    );
}