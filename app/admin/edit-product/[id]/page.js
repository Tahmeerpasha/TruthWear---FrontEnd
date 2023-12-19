'use client'
// Importing necessary dependencies and components
import api from '@/api/api';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { VscTriangleRight } from 'react-icons/vsc';

// Component definition
const Page = ({ params }) => {
    // Using a distinct name for the state variable
    const [formDataState, setFormData] = useState({
        productName: '',
        description: '',
        stock: 0,
        price: 0,
        image: null,
    });
    const router = useRouter()
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        api.defaults.headers.common['Content-Type'] = 'multipart/form-data';
        try {
            // Creating a FormData object with a distinct name
            const formData = new FormData();

            // Appending form fields to FormData
            formData.append('productCategory', product?.category?.id || null);
            if (formDataState.productName !== '') formData.append('productName', formDataState.productName);
            if (formDataState.description !== '') formData.append('productDescription', formDataState.description);
            if (formDataState.image != null) formData.append('image', formDataState.image);
            if (formDataState.stock != 0) formData.append('stock', formDataState.stock || 0);
            if (formDataState.price != 0) formData.append('price', formDataState.price);
            console.log(formDataState);
            api.put(`/products/${params.id}`, formData).then((res) => console.log(res)).then(() => router.push('/admin/products'));
        } catch (err) {
            console.log(err)
        }

    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        // Updating the state with a distinct name
        setFormData({
            ...formDataState,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    // Function to fetch product details
    const fetchProductDetails = async () => {
        try {
            const res = await api.get(`/products/${params.id}`);
            console.log(res)
            const data = await res.data;
            console.log(data);
            setProduct(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setError('Error fetching product details');
            setLoading(false);
        }
    };

    // Fetch product details on component mount
    useEffect(() => {
        fetchProductDetails();
    }, [params.id]);

    // Render loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render the main component
    return (
        <div>
            <div className='p-5'>
                <div className='flex gap-2 items-center'>
                    <span className='text-4xl'>Products</span>
                    <VscTriangleRight size={40} className='p-1 mt-2' />
                    <span className='text-4xl underline'>{product?.category?.categoryName}</span>
                </div>
                <form className='p-1 flex flex-col ' onSubmit={handleFormSubmit}>
                    {['Name', 'Description', 'Category', 'Stock', 'Price'].map((label) => (
                        <div key={label} className='grid p-2 '>
                            <span className='text text-3xl'>{`Product ${label}`}</span>
                            {label === 'Description' ? (
                                <textarea
                                    name={label.toLowerCase()}
                                    id={label.toLowerCase()}
                                    value={formDataState.description || product?.description}
                                    cols='60'
                                    rows='2'
                                    className='bg-slate-200 p-3 border border-black rounded-xl'
                                    onChange={handleInputChange}
                                ></textarea>
                            ) : label === 'Category' ? (
                                <input
                                    type='text'
                                    disabled
                                    value={product?.category?.categoryName}
                                    className='bg-slate-200 p-3 border border-black rounded-xl '
                                />
                            ) : label === 'Name' ? (
                                <input
                                    type='text'
                                    name='productName'
                                    id='productName'
                                    value={formDataState?.productName || product?.productName}
                                    className='bg-slate-200 p-3 border border-black rounded-xl'
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <input
                                    type={label === 'Stock' || label === 'Price' ? 'number' : 'text'}
                                    name={label.toLowerCase()}
                                    id={label.toLowerCase()}
                                    value={formDataState[label.toLowerCase()] || product?.[label.toLowerCase()]}
                                    className='bg-slate-200 p-3 rounded-xl border border-black'
                                    onChange={handleInputChange}
                                />
                            )}
                        </div>
                    ))}
                    <div className='grid grid-cols-2 items-center gap-8'>
                        <span className='p-2 text-3xl '>Product Image:</span>
                        <input type='file' name='image' onChange={handleInputChange} />
                    </div>
                    <Button type='submit' className='bg-black mt-4 p-2 text-2xl hover:cursor-pointer'>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Page;
