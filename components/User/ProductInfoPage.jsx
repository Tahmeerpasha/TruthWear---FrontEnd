'use client'
import api from '@/logic/api'
import React, { useEffect, useState } from 'react'

const ProductInfoPage = ({ id }) => {
    const [product, setProduct] = useState([])
    const fetchProducts = async () => {
        api.defaults.responseType = 'json'
        const res = await api.get(`/products/${id}`)
        const data = res.data
        console.log(data)
        setProduct(data)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div>
            product info page
            <h1>{product.productName}</h1>
            <h1>{product.price}</h1>
            <h1>{product.description}</h1>



        </div>
    )
}

export default ProductInfoPage