import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:4000/products", {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:4000/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:4000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <div className="sub-heading">
        <h1>Product List</h1>
        <input
          type="text"
          className="search-product-box"
          placeholder="Search Product"
          onChange={searchHandle}
        />
      </div>
      <div className="table-list">
        <table>
          <thead>
            <tr>
              <th>S. No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Image</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>Rs {item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.company}</td>
                  <td>
                    <img src={item.image} alt={item.name} width="100" />
                  </td>
                  <td>
                    <button
                      className="lButton"
                      onClick={() => deleteProduct(item._id)}
                    >
                      Delete
                    </button>
                    <Link to={"/update/" + item._id}>
                      <button className="rButton">Update</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <h1 className="noResult">No Result found</h1>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
