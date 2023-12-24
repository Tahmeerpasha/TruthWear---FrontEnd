import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function DialogDefault({ handleDelete }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Button onClick={handleOpen} variant="gradient">
                Delete
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Are you sure?</DialogHeader>
                <DialogBody>
                    This action will delete all the data related to this product. And It cannot be recovered.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={() => {
                        handleDelete()
                        handleOpen()
                    }}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}