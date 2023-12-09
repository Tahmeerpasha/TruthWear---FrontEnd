import ProductInfoPage from '@/components/User/ProductInfoPage'
import React from 'react'

const page = ({ params }) => {
    return (
        <div>
            <ProductInfoPage id={params.id} />
        </div>

    )
}

export default page