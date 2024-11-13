import React from "react";
import transactionData from "./TransferData";
import { HiArrowNarrowRight } from "react-icons/hi"; // React Icons import karna
import Image from "next/image";
import "./Transfer.css"

const Transfer = () => {
  return (
    <section className="transfer-section">
      <div className="title">
        <h2>Your Transfers</h2>
      </div>

      <div className="transactions">
        {transactionData.map((data, index) => {  // 'Data' ko lowercase 'data' me change kiya
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
        })}
      </div>
      <a href="#" className="view">
        View all <HiArrowNarrowRight /> {/* Icon ko yahan use kar rahe hain */}
      </a>
    </section>
  );
};

export default Transfer;
