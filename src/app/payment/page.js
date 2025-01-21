"use client"

import React, { useState } from "react";
import "./page.css";

const Page = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    // Validation aur payment processing logic yahan likhein
    if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
      setErrorMessage("Please fill out all fields correctly.");
    } else {
      setErrorMessage("");
      alert("Payment Successful!");
    }
  };

  return (
    <section className="payment-container">
      <h1 className="payment-title">Secure Payment</h1>
      <form className="payment-form" onSubmit={handlePayment}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9123 4567"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              maxLength="5"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              required
            />
          </div>

          <div className="form-group">
            <label>CVV</label>
            <input
              type="password"
              maxLength="3"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Card Holder Name</label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <button type="submit" className="pay-button">
          Pay Now
        </button>
      </form>
    </section>
  );
};

export default Page;
