// LearningCenter.js
import React from "react";
import "./page.css";

const Page = () => {
  const topics = [
    { title: "Getting Started", description: "Learn the basics of your dashboard", icon: "📘" },
    { title: "Managing Products", description: "Add, edit, and organize your products", icon: "📦" },
    { title: "Order Tracking", description: "Track and manage customer orders", icon: "📋" },
    { title: "Marketing Tips", description: "Boost your sales with marketing strategies", icon: "📈" },
    { title: "Customer Support", description: "Handle customer queries and support", icon: "💬" },
    { title: "Analytics & Reports", description: "Understand your business with analytics", icon: "📊" },
  ];

  return (
    <div className="learning-center">
      <h2 className="learning-center-title">Learning Center</h2>
      <div className="grid-container">
        {topics.map((topic, index) => (
          <div key={index} className="topic-box">
            <span className="topic-icon">{topic.icon}</span>
            <h3 className="topic-title">{topic.title}</h3>
            <p className="topic-description">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
