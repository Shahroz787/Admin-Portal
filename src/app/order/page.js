"use client";

import React, { useState } from "react";
import "./page.css";

const OrderPage = () => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    address: "",
    phoneNumber: "",
    items: [],
    totalAmount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      items: [...prevDetails.items, { itemName: "", quantity: 1 }],
    }));
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...orderDetails.items];
    newItems[index] = { ...newItems[index], [name]: value };
    setOrderDetails({ ...orderDetails, items: newItems });
  };

  const calculateTotal = () => {
    const total = orderDetails.items.reduce((acc, item) => acc + item.quantity * 10, 0); // Assuming each item costs 10
    setOrderDetails((prevDetails) => ({ ...prevDetails, totalAmount: total }));
  };

  return (
    <div className="order-page  p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Page</h2>
      <div className="order-form space-y-4">
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={orderDetails.customerName}
            onChange={handleChange}
            placeholder="Enter customer's name"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={orderDetails.address}
            onChange={handleChange}
            placeholder="Enter delivery address"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={orderDetails.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="input-field"
          />
        </div>

        <div className="items-section">
          <h3 className="text-xl font-semibold mb-2">Items</h3>
          {orderDetails.items.map((item, index) => (
            <div key={index} className="item-form space-y-2">
              <input
                type="text"
                name="itemName"
                value={item.itemName}
                onChange={(e) => handleItemChange(e, index)}
                placeholder="Item Name"
                className="input-field"
              />
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(e, index)}
                placeholder="Quantity"
                min="1"
                className="input-field"
              />
            </div>
          ))}
          <button onClick={handleAddItem} className="add-item-button">
            Add Item
          </button>
        </div>

        <div className="total-section mt-4">
          <h3 className="text-lg font-semibold">Total Amount: ${orderDetails.totalAmount}</h3>
          <button onClick={calculateTotal} className="calculate-total-button">
            Calculate Total
          </button>
        </div>

        <button className="submit-order-button">Submit Order</button>
      </div>
    </div>
  );
};

export default OrderPage;
