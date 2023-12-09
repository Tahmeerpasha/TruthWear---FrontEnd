import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import HomeProductImage from "../User/HomeProductImage";

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
                                    <HomeProductImage productInfo={product} />
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
                                <Button
                                    ripple={false}
                                    fullWidth={true}
                                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                >
                                    Add to Cart
                                </Button>
                            </CardFooter>
                        </Card>)
                })
            }
        </div>
    );
}