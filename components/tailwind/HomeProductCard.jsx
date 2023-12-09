'use client'
import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import api from "@/logic/api";
import Images from "../Images";
import HomeProductImage from "../User/HomeProductImage";
import { useRouter } from "next/navigation";

export function HomeProductCard({ selectedCategory }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
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
    };

    useEffect(() => {
        const url = selectedCategory
            ? `/products/category/${selectedCategory}`
            : `/products`;

        fetchProducts(url);
    }, [selectedCategory]);

    const handleClick = (id) => {
        console.log("clicked");
        console.log(id)
        router.push(`/product-info/${id}`);
    }
    return (
        <div className="grid grid-cols-3 gap-10">
            {products?.map(product => {
                return (
                    <>
                        <Card className="mt-6 w-96 cursor-pointer " onClick={() => handleClick(product.id)}>
                            <CardHeader color="" className="relative h-56">
                                <HomeProductImage productInfo={product} />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {product.productName}
                                </Typography>
                                <Typography>
                                    {product.description}
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0 flex justify-start">
                                <span>Rs.{product.price}/-</span>
                                <span className="pr-3 pl-3 line-through">Rs.{product.price}</span>
                                {/* Discount */}
                                <span className="text-red-400">(50% off)</span>
                            </CardFooter>
                        </Card>
                    </>
                )
            })}
        </div>
    );
}