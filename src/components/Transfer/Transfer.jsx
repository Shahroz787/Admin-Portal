import React from "react";
import transactionData from "./TransferData"; // Ensure this data is correct
import { HiArrowNarrowRight } from "react-icons/hi";
import Image from 'next/image';
import "./Transfer.css";

const Transfer = () => {
  return (
    <section className="transfer-section">
      <div className="title">
        <h2>Your Transfers</h2>
      </div>

      <div className="transactions">
        {/* Checking if transactionData exists and has items */}
        {transactionData && transactionData.length > 0 ? (
          transactionData.map((data, index) => {
            return (
              <div className="transaction" key={index}>
                <div className="transaction__title">
                  <div className="transaction__title__image">
                    <Image
                      src={data.image}
                      alt="transaction img"
                      width={40}
                      height={70}
                    />
                  </div>

                  <div className="transaction__title__details">
                    <h3>{data.name}</h3>
                    <h5>{data.time}</h5>
                  </div>
                </div>
                <div className="transaction__amount">
                  <span>{data.amount}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p>No transactions available</p> // If no transactions exist
        )}
      </div>

      <a href="#" className="view">
        View all <HiArrowNarrowRight />
      </a>
    </section>
  );
};

export default Transfer;
