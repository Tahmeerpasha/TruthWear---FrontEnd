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

export function CardDefault({ productInfo }) {


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

    return (
        <Card className="mt-6 w-96 ">
            <CardHeader color="blue-gray" className="relative h-56">
                <img
                    src={`E:\\Development\TruthWear\Backend\TruthWear` + productInfo.image}
                    alt="card-image"
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