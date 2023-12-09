'use client'
import Image from 'next/image'
import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { IoSearchSharp } from 'react-icons/io5'
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const UserNavbar = () => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [cartCount, setCartCount] = React.useState(0);
    const [wishlistCount, setWishlistCount] = React.useState(0);

    // Function to handle adding an item to the cart
    const addToCart = () => {
        setCartCount(cartCount + 1);
        // Add logic to add the item to the cart
    };

    // Function to handle adding an item to the wishlist
    const addToWishlist = () => {
        setWishlistCount(wishlistCount + 1);
        // Add logic to add the item to the wishlist
    };
    return (
        <>

            {/* For screens smaller than medium */}
            {!isOpen && <div className='w-full h-fit flex items-center justify-between bg-black md:hidden'>
                <div className='flex items-center'>
                    <AiOutlineMenu color='white' size={25} className='m-1 hover:cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
                    <Image src="/white-logo.jpg" alt="logo" width={1280} height={889} className='w-[50%]' />
                </div>
                <ul className='text-white flex w-fit justify-end'>
                    <li className='p-2 text-xs flex flex-col items-center justify-center'>
                        <IoSearchSharp size={30} className='p-1' />
                        Search
                    </li>
                    <li className='relative p-2 text-xs flex flex-col items-center justify-center' onClick={addToWishlist}>
                        <FaRegHeart size={35} className='p-1' />
                        Wishlist {wishlistCount > 0 && <span className='absolute top-2 right-1 bg-red-500 text-white rounded-full px-2'>{wishlistCount}</span>}
                    </li>
                    <li className='relative p-2 text-xs flex flex-col items-center justify-center' onClick={addToCart}>
                        <FiShoppingCart size={35} className='p-1' />
                        Cart {cartCount > 0 && <span className='absolute top-2 right-[1px] bg-red-500 text-white rounded-full px-2'>{cartCount}</span>}
                    </li>
                </ul>

            </div>}

            {
                isOpen && <div className='w-full min-h-screen  bg-black md:hidden'>
                    <div className='flex items-center'>
                        <div className='flex items-center justify-between'>
                            <AiOutlineClose color='white' size={25} className='m-1 hover:cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
                            <Image src="/white-logo.jpg" alt="logo" width={1280} height={889} className='w-[50%]' />
                            <li className='p-2 text-xs font-bold text-white flex flex-col items-center '>
                                <Image src="/logo.svg" alt="logo" width={40} height={30} className='rounded-full bg-cover' />
                                Account
                            </li>
                        </div>
                    </div>
                    <ul className='justify-stretch text-white text-center items-center w-full p-10'>
                        <li className='pl-5 pr-5 hover:underline hover:cursor-pointer font-medium text-4xl p-10'>Home</li>
                        <li className='pl-5 pr-5 hover:underline hover:cursor-pointer font-medium text-4xl p-10'>Deals</li>
                        <li className='pl-5 pr-5 hover:underline hover:cursor-pointer font-medium text-4xl p-10'>Shop</li>
                        <li className='pl-5 pr-5 hover:underline hover:cursor-pointer font-medium text-4xl p-10'>{"What's New"}</li>
                    </ul>
                </div>
            }

            {/* For Medium and bigger screens */}
            <div className='hidden fixed min-w-full h-fit bg-black md:flex justify-between'>
                <div className='flex p-1 justify-start'>
                    <Image src="/logo.svg" alt="logo" width={100} height={0} className='p-2' />
                    <Image src="/white-logo.jpg" alt="logo" width={1280} height={889} className='w-[40%] bg-black' />

                </div>

                <ul className='flex justify-stretch text-white items-center w-full'>
                    <li className='pl-5 pr-5 hover:underline hover:cursor-pointer font-medium text-xl'>Home</li>
                    <li className='pl-5 pr-5 hover:underline hover:cursor-pointer font-medium text-xl'>Deals</li>
                    <li className='pl-5 pr-5 hover:underline hover:cursor-pointer font-medium text-xl'>Shop</li>
                    <li className='pl-5 pr-5 hover:underline hover:cursor-pointer font-medium text-xl'>{"What's New"}</li>
                </ul>

                <ul className='text-white flex w-fit justify-evenly'>
                    <li className='p-2 text-xs font-bold flex flex-col items-center justify-center'>
                        <IoSearchSharp size={40} className='p-1' />
                        Search
                    </li>
                    <li className='relative p-2 text-xs font-bold flex flex-col items-center justify-center' onClick={addToWishlist}>
                        <FaRegHeart size={40} className='p-1' />
                        Wishlist {wishlistCount > 0 && <span className='absolute top-3 right-[6px] bg-red-500 text-white rounded-full px-2'>{wishlistCount}</span>}
                    </li>
                    <li className='relative p-2 text-xs font-bold flex flex-col items-center justify-center' onClick={addToCart}>
                        <FiShoppingCart size={40} className='p-1' />
                        Cart {cartCount > 0 && <span className='absolute top-2 right-1 bg-red-500 text-white rounded-full px-2'>{cartCount}</span>}
                    </li>
                    <li className='p-2 text-xs font-bold  flex flex-col items-center justify-center'>
                        <Image src="/logo.svg" alt="logo" width={40} height={40} className='rounded-full bg-cover' />
                        Account
                    </li>
                </ul>

            </div>
        </>
    )
}

export default UserNavbar