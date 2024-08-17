import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    const getProductDetails = useCallback(async () => {
        console.log(params);
        let result = await fetch(`http://localhost:4000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        setImage(result.image);
    }, [params]);

    useEffect(() => {
        getProductDetails();
    }, [getProductDetails]);

    const updateProduct = async () => {
        console.log(name, price, category, company, image)
        let result = await fetch(`http://localhost:4000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company, image }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        console.log(result);
        navigate("/");
    };

    return (
        <div className='product'>
            < div className="formBox">
                <h1>Update Product</h1>
                <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" required />
                <input className="inputBox" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter product price" required />
                <input className="inputBox" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter product category" required />
                <input className="inputBox" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter product company" required />
                <input className="inputBox" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image url" required />
                <button onClick={updateProduct} className="appButton" type="button">Update Product</button>
            </div>
        </div>
    )
}

export default UpdateProduct;