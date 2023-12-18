// Loading.js

import Image from 'next/image';
import React from 'react';

const Loading = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <Image src="/your-logo.png" alt="Logo" width={100} height={100} />
            <div className='m-20'>Loading...</div>
        </div>
    );
};

export default Loading;
