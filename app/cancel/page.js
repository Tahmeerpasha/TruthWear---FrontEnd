import Link from 'next/link'
import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'

const page = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <MdOutlineCancel color='red' size={300} />
            <span className='p-5 text-4xl'>Your Transaction is been cancelled. Please Try Again </span>
            <Link href={'/cart'} className='bg-black p-5 rounded-xl text-white text-2xl hover:cursor-pointer hover:scale-105'>Go back to Cart</Link>
        </div>
    )
}

export default page