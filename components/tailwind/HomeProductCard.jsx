import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import HomeProductImage from "../User/HomeProductImage";
import { useRouter } from "next/navigation";

export function HomeProductCard({ products }) {
    const router = useRouter();
    const handleClick = (id) => {
        console.log("clicked");
        console.log(id)
        router.push(`/product-info/${id}`);
    }
    return (
        <div className="grid grid-cols-3 gap-16 p-10">
            {Array.isArray(products) && products?.map(product => {
                return (
                    <>
                        <Card className="mt-4 h-full w-96 cursor-pointer " onClick={() => handleClick(product.id)}>
                            <CardHeader color="blue-gray" className="relative h-56">
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