import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    console.log(!name);
    if (!name || !price || !category || !company || !image) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:4000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, image, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };
  return (
    <div className="product">
      <div className="formBox">
        <h1>Add Product</h1>
        <input
          className="inputBox"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          required
        />
        {error && !name && (
          <span className="invalid-input">Enter valid name</span>
        )}
        <input
          className="inputBox"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price"
          required
        />
        {error && !price && <span className="invalid-input">Enter price</span>}
        <input
          className="inputBox"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter product category"
          required
        />
        {error && !category && (
          <span className="invalid-input">Enter category</span>
        )}
        <input
          className="inputBox"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter product company"
          required
        />
        {error && !company && (
          <span className="invalid-input">Enter company name</span>
        )}
        <input
          className="inputBox"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image url"
          required
        />
        {error && !image && (
          <span className="invalid-input">Enter product url</span>
        )}
        <button onClick={addProduct} className="appButton" type="button">
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
