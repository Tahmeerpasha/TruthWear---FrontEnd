'use client'
import { Progress, Spinner } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Loading = () => {
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLoading(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return showLoading ? (
        <div className='flex flex-col items-center justify-center min-h-screen animate-spin transition delay-1000'>
            {/* <Image src="/faith.jpg" alt="Logo" width={100} height={100} />
            <div className='m-20'>Loading...</div> */}
            <Spinner />
        </div>
    ) : null;
};

export default Loading;
