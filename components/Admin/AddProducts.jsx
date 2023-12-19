// AddProducts.jsx
'use client'
import React, { useState } from 'react';
import { VscTriangleRight } from 'react-icons/vsc';
import { Button } from '@material-tailwind/react';
import api from '@/api/api';
import { useRouter } from 'next/navigation';

const AddProducts = ({ selectedCategory }) => {
    const router = useRouter()
    console.log(selectedCategory);
    const [formDataValue, setFormDataValue] = useState({
        name: '',
        description: '',
        stock: 0,
        price: 0,
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormDataValue({
            ...formDataValue,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedCategory + " This is the category")
        api.defaults.headers.common['Content-Type'] = 'multipart/form-data';
        try {
            var formdata = new FormData();
            formdata.append("productName", formDataValue.name);
            formdata.append("categoryName", selectedCategory);
            formdata.append("productDescription", formDataValue.description);
            formdata.append("image", formDataValue.image);
            formdata.append("stock", formDataValue.stock);
            formdata.append("price", formDataValue.price);
            const response = await api.post(`/products/upload`, formdata)
            const data = await response.data;

            if (response.status === 200) {
                console.log("Success: ", data);
                router.push('/admin/products')
            } else {
                console.log("Failure: ", data);
            }

        } catch (error) {
            console.error('Error:', error);
            // Handle error, e.g., show an error message
        }
        console.log(formDataValue)
    };

    return (
        selectedCategory === null ? <></> :
            <div className='p-5'>
                <div className='flex gap-2 items-center'>
                    <span className='text-4xl'>Products</span>
                    <VscTriangleRight size={40} className='p-1 mt-2' />
                    <span className='text-4xl underline'>{selectedCategory}</span>
                </div>
                <form className='p-1 flex flex-col ' onSubmit={handleFormSubmit}>
                    {['Name', 'Description', 'Category', 'Stock', 'Price'].map((label) => (
                        <div key={label} className='grid p-2 '>
                            <span className='text text-3xl'>{`Product ${label}`}</span>
                            {label === 'Description' ? (
                                <textarea name={label.toLowerCase()} id={label.toLowerCase()} cols='60' rows='2' className='bg-slate-200 p-3 border border-black rounded-xl' onChange={handleInputChange}></textarea>
                            ) : label === 'Category' ? <input type='text' disabled value={selectedCategory} className='bg-slate-200 p-3 border border-black rounded-xl ' />
                                :
                                (
                                    <input type={label === 'Stock' || label === 'Price' ? 'number' : 'text'} name={label.toLowerCase()} id={label.toLowerCase()} className='bg-slate-200 p-3 rounded-xl border border-black' onChange={handleInputChange} />
                                )}
                        </div>
                    ))}
                    <div className='grid grid-cols-2 items-center gap-8'>
                        <span className='p-2 text-3xl '>Product Image:</span>
                        <input type='file' name='image' accept='image/*' onChange={handleInputChange} />
                    </div>
                    <Button type='submit' value='Submit' className='bg-black mt-4 p-2 text-2xl hover:cursor-pointer'>Submit</Button>
                </form>
            </div>
    );
};

export default AddProducts;
