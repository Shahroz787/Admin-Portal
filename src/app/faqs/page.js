"use client"

import React, { useState } from "react";
import "./page.css";

const Page = () => {
  const faqData = [
    { question: "How can I track my order?", answer: "You can track your order by logging into your account and navigating to the &apos;My Orders&apos; section." },
    { question: "What is the return policy?", answer: "Our return policy allows returns within 30 days of delivery for a full refund." },
    { question: "How do I contact customer support?", answer: "You can contact our customer support team via the &apos;Contact Us&apos; page or by calling our hotline." },
    { question: "Can I change my order after placing it?", answer: "Order changes are allowed within the first 24 hours. Please contact support for assistance." },
  ];

  return (
    <div className="faqs-container">
      <h2 className="faqs-title">Frequently Asked Questions</h2>
      <div className="faqs-list">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <span>{question}</span>
        <span className="faq-toggle">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

export default Page;
