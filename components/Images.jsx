import React from 'react'
import { useEffect, useRef } from "react";
import api from "@/api/api";
import Image from 'next/image';

const Images = ({ productInfo }) => {
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
        <div className='flex w-fit items-center h-[400px]  rounded-xl'>
            <Image
                ref={imageRef}
                alt="card-image"
                className="w-fit h-[500px]  object-cover"
                width={1920}
                height={1080}
            />
        </div>
    )

}

export default Images