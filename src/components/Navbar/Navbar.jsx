import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import "./Navbar.css";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";

const Navbar = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setProfileImage(userData.avatar || "/images/avatar_icon.png");
            setUsername(userData.username || "User");
          }
        }
      });
    };

    fetchUserData();

    // Clean up the listener when component unmounts
    return () => {
      onAuthStateChanged(auth, () => {}); // Unsubscribe from the listener
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h4>Hi {username}!</h4>
        <h1>
          Welcome to <span>SHOP DASHBOARD</span>
        </h1>
      </div>

      <div className="navbar-actions">
        <div className="navbar-search flex justify-around ">
          <BiSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>

        {profileImage && (
          <div className="profile-image">
            <Image
              src={profileImage}
              alt="Profile"
              className="profile-img"
              width={75}
              height={75}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
