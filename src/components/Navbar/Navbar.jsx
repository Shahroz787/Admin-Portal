import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import "./Navbar.css";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../app/config/firebase";
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

      <div className="flex justify-center items-center">
        <div className="navbar-search">
          <BiSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>

        {/* Profile Image next to Search Bar */}
        {profileImage && (
          <div>
            <Image
              src={profileImage}
              alt="Profile"
              className="profile-img"
              width={75} // Correct numeric value for width
              height={75} // Correct numeric value for height
              style={{
                borderRadius: "50%", // Round the profile image
                marginLeft: "10px", // Space between the search bar and profile image
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
