'use client'
// Login.jsx
import React, { useState } from 'react';
import { login } from '@/logic/authService'
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            // Call your authentication service to get tokens
            console.log("Handling login...")
            console.log(formData.email + " " + formData.password)
            await login(formData.email, formData.password)
                .then((res) => {
                    console.log(res)
                    console.log('Login successful!');
                    // Redirect to the home page or perform other actions after successful logi
                    // window.location.href = '/'
                    router.push('/')
                }).catch((err) => {
                    console.log(err)
                });
        } catch (error) {
            console.error('Login failed:', error.message);
            // Handle login failure, e.g., show an error message
        }
    };

    return (
        <div className='w-120 px-20 flex flex-col justify-center items-start'>
            <h1 className='text-5xl font-bold mb-10 mt-12'>Login</h1>
            <form className='w-full' onSubmit={handleLogin}>
                <div className="mb-4 ">
                    <div className="w-[80%] m-3 ">
                        <label htmlFor="email" className=" mb-0 text-3xl ">Email</label>
                        <input
                            id="email"
                            name='email'
                            className="w-full p-1 border border-gray-300 rounded-lg"
                            type="text"
                            placeholder="Enter your email here"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-[80%] m-3 ">
                        <label htmlFor="password" className="block mb-0 text-3xl">Password</label>
                        <input
                            id="password"
                            name='password'
                            className="w-full p-1 border border-gray-300 rounded-lg"
                            type="text"
                            placeholder="Enter your last name"
                            value={formData.password || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <Button type='submit' className='m-3'>Login</Button>
            </form>
        </div>
    );
};

export default Login;
