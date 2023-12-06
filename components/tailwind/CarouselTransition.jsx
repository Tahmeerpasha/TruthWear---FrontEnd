'use client'
import api from "@/logic/api";
import { Carousel, Spinner } from "@material-tailwind/react";
import Image from "next/image";
import { React, useEffect, useState } from "react";
import { CardDefault } from "./CardDefault";
import Images from "../Images";

export function CarouselTransition() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
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

    return (
        <Carousel transition={{ duration: 2 }} className="rounded-xl mt-3" loop autoplay>
            {products.map(product => {
                return (
                    <div className="max-h-[500px] object-cover" key={product.id}>
                        <Images productInfo={product} key={product.id} />
                    </div>
                )
            })
            }
        </Carousel>
    );
}