'use client'
import { Spinner } from '@material-tailwind/react';
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
        <div className='flex flex-col items-center justify-center'>
            <Spinner />
        </div>
    ) : null;
};

export default Loading;
