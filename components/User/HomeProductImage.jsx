import React from 'react'
import { useEffect, useRef } from "react";
import api from "@/logic/api";
import Image from 'next/image';

const HomeProductImage = ({ productInfo }) => {
    const imageRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        const fetchImage = async () => {
            try {
                api.defaults.responseType = 'blob';
                const response = await api.get(`/products/image/${productInfo.id}`);
                const blob = response.data;

                if (isMounted) {
                    const imageUrl = URL.createObjectURL(blob);
                    imageRef.current.src = imageUrl;
                }
            } catch (error) {
                console.log('Error fetching image', error);
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
        };
    }, [productInfo.id]);
    return (
        <div className=' '>
            <img
                ref={imageRef}
                alt="card-image"
                className="w-full h-full object-contain"
            />
        </div>
    )

}

export default HomeProductImage