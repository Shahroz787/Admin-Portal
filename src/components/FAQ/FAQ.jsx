import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import FaqsData from "./FaqsData";
import "./FAQ.css";

const FAQ = () => {
  const [Data, setData] = useState(FaqsData);

  return (
    <div className="faq-section">
      <div className="faq-title">
        <h2>Info for Deliveryman</h2>
      </div>

      <div className="faqs">
        {Data.map((faq, index) => (
          <div className="faq" key={index}>
            <div className="faq-info">
              {faq.icon}
              <h4>{faq.text}</h4>
            </div>
            <IoIosArrowForward className="faq-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
