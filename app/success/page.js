'use client'
import Link from 'next/link'
import React from 'react'
import ReactConfetti from 'react-confetti'
import { FaCheckCircle } from 'react-icons/fa'

const page = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
            <div className='flex flex-col  items-center'>
                <FaCheckCircle color='green' size={300} />
                <span className='lg:p-5 lg:text-4xl p-10 mx-10'>Your Transaction is been Successful. Thank you for shopping with us </span>
                <Link href={'/'} className='bg-black p-5 rounded-xl text-white lg:text-2xl hover:cursor-pointer hover:scale-105'>Go back to Home Page</Link>
            </div>
        </div>
    )
}

export default page