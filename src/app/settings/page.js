// Settings.js
import React from "react";
import "./page.css";

const page = () => {
  const settingsOptions = [
    { title: "Account Settings", description: "Manage your personal account details", icon: "👤" },
    { title: "Privacy", description: "Adjust your privacy preferences", icon: "🔒" },
    { title: "Notifications", description: "Set your notification preferences", icon: "🔔" },
    { title: "Billing", description: "Manage billing information and payment methods", icon: "💳" },
    { title: "Security", description: "Update passwords and enable 2FA", icon: "🔐" },
    { title: "Language", description: "Select your preferred language", icon: "🌐" },
  ];

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <div className="settings-grid">
        {settingsOptions.map((option, index) => (
          <div key={index} className="settings-box">
            <span className="settings-icon">{option.icon}</span>
            <h3 className="settings-option-title">{option.title}</h3>
            <p className="settings-description">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
