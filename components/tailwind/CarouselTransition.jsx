'use client'
import api from "@/logic/api";
import { Carousel, Spinner } from "@material-tailwind/react";
import { React, useEffect, useState } from "react";
import Images from "../Images";
import { useRouter } from "next/navigation";

export function CarouselTransition() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
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

    useEffect(() => {
        fetchProducts('/products')
        console.log('CarouselTransition')
    }, [])

    if (loading) {
        return <div className="text-center"><Spinner /></div>;
    }

    const handleClick = (id) => {
        console.log(id)
        router.push(`/product-info/${id}`)
    }

    return (
        <Carousel transition={{ duration: 2 }} className="rounded-xl overflow-hidden w-fit bg-black mx-10 mt-4 py-3" loop autoplay>
            {error && <p>{error}</p>}
            {products?.map(product => {
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
            })
            }
        </Carousel>
    );
}