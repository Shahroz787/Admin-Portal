import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import "./Profile.css";

const Profile = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data inside useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once when component mounts

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="profile-container">
      <h2>Top Products</h2>
      <div className="search-bar">
        <BiSearch />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="button-enter">Enter</button>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <Image
              src={product.image}
              alt={product.title}
              className="product-image"
              width={200}
              height={200}
            />
            <div className="product-info">
              <h5>{product.title}</h5>
              <div className="category">
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
