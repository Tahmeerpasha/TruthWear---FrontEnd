'use client'
import Link from 'next/link'
import React from 'react'
import ReactConfetti from 'react-confetti'
import { FaCheckCircle } from 'react-icons/fa'

const page = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <ReactConfetti />
            <div className='flex flex-col  items-center'>
                <FaCheckCircle color='green' size={300} />
                <span className='p-5 text-4xl'>Your Transaction is been Successful. Thank you for shopping with us </span>
                <Link href={'/'} className='bg-black p-5 rounded-xl text-white text-2xl hover:cursor-pointer hover:scale-105'>Go back to Home Page</Link>
            </div>
        </div>
    )
}

export default page