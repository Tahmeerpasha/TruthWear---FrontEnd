import ProductInfoPage from '@/components/User/ProductInfoPage'
import React from 'react'

const page = ({ params }) => {
    return (
        <div className='bg-gray-200 pt-10'>
            <div className='p-3 text-3xl text-center'>
                <span>Product Details</span>
            </div>
            <ProductInfoPage id={params.id} />
        </div>

    )
}

export default page