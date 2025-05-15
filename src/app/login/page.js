"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./page.css";
import { login, signup } from "../../config/firebase";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const Page = () => {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth();
    const [currentState, setCurrentState] = useState("signup");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // State for error message

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            if (currentState === "signup") {
                await signup(userName, email, password);
                setError(""); // Reset error only on successful signup
                setCurrentState("login");
            } else {
                console.log("login-click");
                const user = await login(email, password); // Call login function
                localStorage.setItem("authToken", JSON.stringify(user.accessToken)); // Save token
                setIsAuthenticated(true); // Update authentication state
                setError(""); // Reset error only on successful login
                router.replace("/"); // Redirect to dashboard
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            setError("Invalid email or password. Please Sign-Up first."); // Set error message
        } finally {
            setLoading(false);
        }
    };

    const handleStateChange = (newState) => {
        setError(""); // Reset error when switching between login and signup
        setCurrentState(newState);
    };

    return (
        <div className="login">
            <Image src="/images/logo.png" alt="logo" className="logo" width={200} height={100} />
            <form onSubmit={submitHandler} className="login-form">
                <h3>{currentState === "signup" ? "Sign Up" : "Login"}</h3>

                {/* Display error message */}
                {error && <p className="error-message">{error}</p>}

                {currentState === "signup" && (
                    <input
                        type="text"
                        placeholder="Username"
                        className="form-input"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        required
                    />
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
                <button type="submit" disabled={loading}>
                    {loading ? <div className="loading-spinner">Loading...</div> : currentState === "signup" ? "Create Account" : "Login Now"}
                </button>

                <div className="login-term">
                    <input type="checkbox" />
                    <p>Agree to the terms of use and privacy policy</p>
                </div>
                <div className="login-forgot">
                    {currentState === "signup" ? (
                        <p className="login-toggle">
                            Already have an account?{" "}
                            <span onClick={() => handleStateChange("login")}>Login here</span>
                        </p>
                    ) : (
                        <p className="login-toggle">
                            Don&apos;t have an account?{" "}
                            <span onClick={() => handleStateChange("signup")}>Sign up here</span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Page;
