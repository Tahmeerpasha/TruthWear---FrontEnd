import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import HomeProductImage from "../User/HomeProductImage";
import AddToCartButton from "../User/AddToCartButton";

export function EcommerceCard({ products }) {
    const router = useRouter();
    const handleClick = (id) => {
        console.log("clicked");
        console.log(id)
        router.push(`/product-info/${id}`);
    }


    return (
        <div className="grid grid-cols-3 gap-16 p-10">
            {
                Array.isArray(products) && products?.map(product => {
                    return (
                        <Card className="w-96" key={product.id} >
                            <div className="hover:cursor-pointer" onClick={() => handleClick(product.id)}>

                                <CardHeader shadow={false} floated={false} className="h-64">
                                    <HomeProductImage style={'h-full w-full'} productInfo={product} />
                                </CardHeader>
                                <CardBody>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Typography color="blue-gray" className="font-medium">
                                            {product.productName}
                                        </Typography>
                                        <Typography color="blue-gray" className="font-medium">
                                            Rs.{product.price}/-
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal opacity-75"
                                    >
                                        {product.description}

                                    </Typography>
                                </CardBody>
                            </div>

                            <CardFooter className="pt-0">
                                <AddToCartButton product={product} />
                            </CardFooter>
                        </Card>)
                })
            }
        </div>
    );
}
