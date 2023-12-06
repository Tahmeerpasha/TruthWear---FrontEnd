import React from 'react'
import { useEffect, useRef } from "react";
import api from "@/logic/api";

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
        <div>
            <img
                ref={imageRef}
                alt="card-image"
                className=" w-full h-full rounded-md object-fill "
            />
        </div>
    )
}

export default Images