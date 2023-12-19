import React, { useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "@/lib/features/userSlice";

export function DialogWithForm() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === "checkbox" ? checked : value;

        setFormData({
            ...formData,
            [name]: inputValue,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Call your authentication service to get tokens
            console.log("Handling login...");
            console.log(formData.email + " " + formData.password);
            console.log("Remember Me:", formData.rememberMe);
            const response = dispatch(loginUserAsync(formData.email, formData.password))
            if (response?.siteUser)
                location.reload();


            handleOpen();
            // if (onLogin) onLogin();
        } catch (error) {
            console.error("Login failed:", error.message);
            // Handle login failure, e.g., show an error message
        }
    };

    return (
        <>
            <Button onClick={handleOpen}>Sign In</Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Sign In
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Enter your email and password to Sign In.
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Your Email
                        </Typography>
                        <Input
                            label="Email"
                            name="email"
                            size="lg"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <Typography className="-mb-2" variant="h6">
                            Your Password
                        </Typography>
                        <Input
                            label="Password"
                            name="password"
                            size="lg"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <div className="-ml-2.5 -mt-3">
                            <Checkbox
                                label="Remember Me"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                            />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleLogin} fullWidth>
                            Sign In
                        </Button>
                        <Typography variant="small" className="mt-4 flex justify-center">
                            Don&apos;t have an account?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                                onClick={handleOpen}
                            >
                                Sign up
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}
