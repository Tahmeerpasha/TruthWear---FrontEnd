import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import Link from "next/link";
import api from "@/logic/api";
import Images from "../Images";

export function CardDefault({ productInfo }) {

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


    return (
        <Card className="mt-6 w-96 ">
            <CardHeader color="blue-gray" className="relative h-56">
                <Images productInfo={productInfo} />
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
