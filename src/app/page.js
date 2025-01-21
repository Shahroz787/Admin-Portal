"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';
import { login, signup } from './config/firebase';
import upload from './lib/upload';
import Image from 'next/image';

const Page = () => {
    const router = useRouter();
    const [currentState, setCurrentState] = useState("signup");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null); // Added state for profile image
    const [imagePreview, setImagePreview] = useState(""); // For storing the preview URL

    useEffect(() => {
        // Clean up image preview URL on component unmount or image change
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview); // Free up memory when the component is unmounted or image is changed
            }
        };
    }, [imagePreview]);

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
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
        } catch (error) {
            console.error("Error during authentication:", error);
            // Handle any error that might occur (e.g., show an error message)
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
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
                                onChange={handleImageChange}
                                hidden
                            />
                            <Image
                                src={imagePreview || "/images/avatar_icon.png"} // Use preview URL or default image
                                alt="Profile Avatar"
                                width= {80}
                                height= {80}
                                style={{
                                    
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
                            Don&apos;t have an account?{" "}
                            <span onClick={() => setCurrentState("signup")}>Sign up here</span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Page;
