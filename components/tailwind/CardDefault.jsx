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
        <Card className="mt-6 w-96 ">
            <CardHeader color="blue-gray" className="relative h-56">
                <img
                    ref={imageRef}
                    alt="card-image"
                    className=" w-full h-full rounded-md object-fill"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {productInfo.productName}
                </Typography>
                <Typography>
                    {productInfo.description}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-between">
                <Link href={`/admin/edit-product/${productInfo.id}`}>
                    <Button color="yellow">Edit</Button>
                </Link>
                <Button color="red" onClick={handleDelete}>Delete</Button>
            </CardFooter>
        </Card>
    );
}
