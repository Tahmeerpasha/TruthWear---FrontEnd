import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import Link from "next/link";
import api from "@/api/api";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { DialogDefault } from "./DialogDefault";

export function CardDefault({ productInfo }) {
    const imageRef = useRef(null);

    const handleDelete = () => {
        // Add logic to delete the product
        try {
            api.delete(`/products/${productInfo.id}`).then((res) => {
                console.log(res);
                window.location.reload();
            });
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchImage = async () => {
            try {
                api.defaults.responseType = 'blob';
                const response = await api.get(`/products/image/${productInfo.id}`);
                const blob = response.data;

                if (isMounted) {
                    const imageUrl = URL.createObjectURL(blob);
                    imageRef.current.src = imageUrl;
                }
            } catch (error) {
                console.log('Error fetching image', error);
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
        };
    }, []);


    return (
        <Card className="w-96 mt-6">
            <CardHeader shadow={false} floated={false} className="h-96">
                <Image
                    ref={imageRef}
                    alt="card-image"
                    className="h-full w-full object-cover rounded-md"
                />
            </CardHeader>
            <CardBody>
                <div className="mb-2 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                        {productInfo.productName}
                    </Typography>
                </div>
                <Typography
                    color="gray"
                    className="font-normal opacity-75"
                >
                    {productInfo.description}
                </Typography>
                <Typography className="text-end p-2 text-black">
                    Rs.{productInfo.price}/-
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-between">
                <Link href={`/admin/edit-product/${productInfo.id}`}>
                    <Button color="blue">Edit</Button>
                </Link>
                <DialogDefault handleDelete={handleDelete} />
                {/* <Button color="red" onClick={() => { <DialogDefault /> }}>Delete</Button> */}
            </CardFooter>
        </Card>
    );
}
