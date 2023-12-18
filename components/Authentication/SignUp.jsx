'use client'
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignUp = () => {
    const BASE_URL = 'http://localhost:8080/api/v1'
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            console.log("Handling sign up...");
            console.log(formData);
            const response = await axios.post(`${BASE_URL}/auth/register`, formData);
            console.log("Sign up successful!" + response.data);
            const { token, refreshToken, siteUser } = response.data;
            localStorage.setItem("accessToken", token);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("siteUser", JSON.stringify(siteUser));
            console.log("Response:", token, refreshToken, siteUser);
            router.push("/login");
        } catch (error) {
            console.error("Sign up failed:", error.message);
            // Handle sign up failure, e.g., show an error message
        }

        // Clear the form data
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
        });
    };

    return (
        <div className="flex h-screen">

            <div className="w-1/2 bg-gray-200 flex justify-center items-center h-full">
                {/* Image or content for the picture */}
                <Image src={'/Pray-On-It.svg'} alt="quotes" width={100} height={100} className="w-[500px]" />
                {/* Adjust styles to fill 40% of the screen */}
            </div>
            <div className="w-120 px-20 flex flex-col justify-center items-start">
                <h1 className="text-5xl font-bold mb-10">Sign Up</h1>
                <form className="w-full" onSubmit={handleSignUp}>
                    <div className="mb-4 flex">
                        <div className="w-1/2 mr-2">
                            <label htmlFor="firstName" className="block mb-0">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                required
                                className="w-full p-1 border border-gray-300 rounded-lg"
                                type="text"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-1/2 ml-2">
                            <label htmlFor="lastName" className="block mb-0">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                className="w-full p-1 border border-gray-300 rounded-lg"
                                type="text"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-0">
                            E-mail <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            required
                            className="w-full p-1 border border-gray-300 rounded-lg"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block mb-0">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                            className="w-full p-1 border border-gray-300 rounded-lg"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-0">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            name="password"
                            required
                            className="w-full p-1 border border-gray-300 rounded-lg"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-0">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            name="password"
                            required
                            className="w-full p-1 border border-gray-300 rounded-lg"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <Button type="submit" className="w-full">
                            Create account
                        </Button>
                    </div>
                </form>
                {/* <div className="mb-4 mt-6 text-center">
                    <p className="mb-2 mt-2">Or Sign Up with</p>
                    <div>
                        {/* Google icon */}
                {/* Adjust styles for the Google icon */}
                {/* </div> */}
                {/* </div> */}
                {/* <p className="text-center text-gray-600">
                    Already have an account ?{" "}
                    <a href="/signin" className="text-blue-500">
                        Sign In
                    </a>
                </p> */}
            </div>
        </div>
    );
};

export default SignUp;
