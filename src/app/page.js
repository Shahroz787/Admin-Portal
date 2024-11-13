"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';
import { login, signup } from './config/firebase';
import upload from './lib/upload';

const Page = () => {
    const router = useRouter();
    const [currentState, setCurrentState] = useState("signup");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null); // Added state for profile image

    const submitHandler = async (event) => {
        event.preventDefault();

        if (currentState === "signup") {
            console.log("signup-click");

            // Upload profile image if provided
            let avatarURL = "";
            if (image) {
                avatarURL = await upload(image); // Upload image and get URL
            }

            // Signup user with additional avatar URL
            await signup(userName, email, password, avatarURL);
            setCurrentState("login");
        } else {
            console.log("login-click");
            await login(email, password, router);
        }
    };


    return (
        <div className="login">
            <form onSubmit={submitHandler} className="login-form">
                <h3>{currentState === "signup" ? "Sign Up" : "Login"}</h3>

                {currentState === "signup" && (
                    <>
                        {/* Profile Image Upload */}
                        <label htmlFor="avatar" className='flex justify-center flex-col text-center'>
                            <input
                                type="file"
                                id="avatar"
                                accept=".png, .jpg, .jpeg"
                                onChange={(e) => setImage(e.target.files[0])}
                                hidden
                            />
                            <img
                                src={image ? URL.createObjectURL(image) : "/images/avatar_icon.png"} // Placeholder image if no file selected
                                alt=""
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "50%",
                                    objectFit: "cover", // Maintains aspect ratio
                                    border: "2px solid #ddd", // Optional, for styling
                                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)", // Optional, adds subtle shadow
                                    marginLeft: "35%"
                                }}

                            />
                            Upload Profile Image
                        </label>

                        <input
                            type="text"
                            placeholder="Username"
                            className="form-input"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            required
                        />
                    </>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="form-input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button type="submit">
                    {currentState === "signup" ? "Create Account" : "Login Now"}
                </button>

                <div className="login-term">
                    <input type="checkbox" />
                    <p>Agree to the terms of use and privacy policy</p>
                </div>
                <div className="login-forgot">
                    {currentState === "signup" ? (
                        <p className="login-toggle">
                            Already have an account?{" "}
                            <span onClick={() => setCurrentState("login")}>Login here</span>
                        </p>
                    ) : (
                        <p className="login-toggle">
                            Don't have an account?{" "}
                            <span onClick={() => setCurrentState("signup")}>Sign up here</span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Page;
