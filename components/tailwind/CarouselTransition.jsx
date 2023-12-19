'use client'
import { Carousel, Spinner } from "@material-tailwind/react";
import { React, Suspense } from "react";
import Images from "../Images";
import { useRouter } from "next/navigation";

export function CarouselTransition({ products }) {
    const router = useRouter();
    const handleClick = (id) => {
        console.log(id)
        router.push(`/product-info/${id}`)
    }

    return (
        <Suspense fallback={<Spinner />}>
            <Carousel transition={{ duration: 2 }} className="rounded-xl overflow-hidden w-full mx-10 bg-black mt-4 py-3" loop autoplay>
                {products.length > 0 && products?.map(product => {
                    return (
                        <div className="max-h-[400px] flex  justify-between" key={product.id} onClick={() => handleClick(product.id)}>
                            <div className="flex flex-col text-white">
                                <p className="text-4xl p-5 underline">Our Newest Collections</p>
                                <div className="p-10 flex flex-col justify-start">
                                    <h1 className="text-3xl x-10">{product.productName}</h1>
                                    <h1 className="text-sm py-5">{product.description}</h1>
                                    <h1 className="text-xl ">Only Rs.{product.price}/-</h1>
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