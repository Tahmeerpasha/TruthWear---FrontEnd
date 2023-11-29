import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { SECRET_KEY } from "../config";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function CardDefault({ productInfo }) {
    const imageRef = useRef(null);

    const handleDelete = () => {
        // Add logic to delete the product
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + SECRET_KEY);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/v1/products/${productInfo.id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };

    useEffect(() => {
        let isMounted = true;

        const fetchImage = async () => {
            try {
                var myHeaders = new Headers();
                myHeaders.append('Authorization', 'Bearer ' + SECRET_KEY);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow',
                };

                const response = await fetch(
                    `http://localhost:8080/api/v1/products/image/${productInfo.id}`,
                    requestOptions
                );

                const blob = await response.blob();

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
    }, [productInfo.id]);

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
