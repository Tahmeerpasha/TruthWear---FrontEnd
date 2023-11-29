// AddProducts.jsx
'use client'
import React, { useEffect, useState } from 'react';
import { VscTriangleRight } from 'react-icons/vsc';
import { SECRET_KEY } from './config';
import { Button } from '@material-tailwind/react';

const AddProducts = ({ selectedCategory }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        stock: 0,
        price: 0,
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + SECRET_KEY);

            var formdata = new FormData();
            formdata.append("categoryName", selectedCategory);
            formdata.append("productName", formData.name);
            formdata.append("productDescription", formData.description);
            formdata.append("image", formData.image);
            formdata.append("stock", formData.stock);
            formdata.append("price", formData.price);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch("http://localhost:8080/api/v1/products/upload", requestOptions);
            const data = await response.json();

            if (response.ok) {
                console.log("Success: ", data);
            } else {
                console.log("Failure: ", data);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error, e.g., show an error message
        }
        console.log(formdata)
        console.log(formData)
        // window.location.reload();
    };

    return (
        selectedCategory == null ? '' :
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
                        <input type='file' name='image' onChange={handleInputChange} />
                    </div>
                    <Button type='submit' value='Submit' className='bg-black mt-4 p-2 text-2xl hover:cursor-pointer'>Submit</Button>
                </form>
            </div>
    );
};

export default AddProducts;
