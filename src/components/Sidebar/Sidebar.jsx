"use client";

import React, { useState } from "react";
import "./Sidebar.css";
import { BsFillChatTextFill } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa";
import { FcShop } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { GiTwirlCenter, GiHamburgerMenu } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { MdDeliveryDining, MdSpaceDashboard } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import { logout } from "@/config/firebase";
import { useRouter } from "next/navigation"; // Import useRouter
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const [currentLinks, setCurrentLinks] = useState(null); // Null for no active link initially
  const [navbarState, setNavbarState] = useState(false);
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

      
  console.log("currentLinks",currentLinks)

  const handleLogout = async () => {
    try {
      await logout(setIsAuthenticated); // Pass setIsAuthenticated to logout
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleSidebar = () => setNavbarState((prev) => !prev);

  return (
    <>
      {/* Sidebar Container */}
      <div className={`sidebar-container ${navbarState ? "show" : ""}`}>
        <div className="top">
          <div className="flex justify-between items-center z-10 bg-slate-900 w-full">
            <div className="brand">
              <FcShop />
              <span className="brand-heading">ChawkBazar Shop</span>
            </div>
            <div className="toggle" onClick={toggleSidebar}>
              {navbarState ? <VscChromeClose /> : <GiHamburgerMenu />}
            </div>
          </div>
          <div className={`links ${navbarState ? "show" : ""}`}>
            <ul>
              {[
                ["Dashboard", MdSpaceDashboard, "/"],
                ["Order", MdDeliveryDining, "/order"],
                ["Payment Details", FaAddressCard, "/payment"],
                ["Learning Center", GiTwirlCenter, "/learning-center"],
                ["FAQs", BsFillChatTextFill, "/faqs"],
                ["Settings", IoSettings, "/settings"],
              ].map(([label, Icon, path], idx) => (
                <li
                  key={label}
                  className={currentLinks === idx ? "active" : ""}
                  onClick={() => setCurrentLinks(idx)} // Set the index of clicked link
                >
                  <Link href={path}>
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="logout">
          <a onClick={handleLogout} style={{ cursor: "pointer" }}>
            <FiLogOut />
            <span>Logout</span>
          </a>
        </div>
      </div>

      {/* Responsive Navigation */}
      <div className={`responsive-nav ${navbarState ? "show" : ""}`}>
        <div className="responsive-links">
          <ul>
            {[
              ["Dashboard", MdSpaceDashboard, "/dashboard"],
              ["Order", MdDeliveryDining, "/order"],
              ["Payment Details", FaAddressCard, "/payment"],
              ["Learning Center", GiTwirlCenter, "/learning-center"],
              ["FAQs", BsFillChatTextFill, "/faqs"],
              ["Settings", IoSettings, "/settings"],
            ].map(([label, Icon, path], idx) => (
              <li
                key={label}
                className={currentLinks === idx ? "active" : ""}
                onClick={() => setCurrentLinks(idx)}
              >
                <Link href={path}>
                  <Icon />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
            {/* Logout Option for Mobile */}
            <li className="logout-mobile">
              <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                <FiLogOut />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
