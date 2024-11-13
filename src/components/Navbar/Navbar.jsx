import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import "./Navbar.css";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../app/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
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
            <img
              src={profileImage}
              alt="Profile"
              className="profile-img"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                marginLeft: "10px",
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
