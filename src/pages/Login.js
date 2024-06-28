import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

import { getCurrentUserFromLocalStorage, logout } from "../utils/authHelpers";

const Login = ({ localProfiles, setCurrentUser, sessionTimeout }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = getCurrentUserFromLocalStorage();
        if (user) {
            logout(setCurrentUser, navigate);
        }
    }, [setCurrentUser, navigate]);

    useEffect(() => {
        if (sessionTimeout) {
            setShowTimeoutMessage(true);
        }
    }, [sessionTimeout]);

    const handleLogin = () => {
        const profile = localProfiles.find(
            (localProfile) => localProfile.email === email
        );
        if (profile) {
            const hashedInputPassword = CryptoJS.SHA256(password).toString();
            if (profile.password === hashedInputPassword) {
                setCurrentUser(email);
                localStorage.setItem("currentUser", email);
                navigate("/view-profile");
            } else {
                setError("Invalid email or password");
            }
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen sm:bg-darkBlue">
            <div className="w-full sm:max-w-[80%] md:max-w-md p-8 border-none sm:border rounded-none sm:rounded-custom shadow-none sm:shadow-custom bg-white min-h-screen sm:min-h-fit sm:m-auto">
                <h1 className="text-2xl font-bold mb-6 text-darkBlue">Login</h1>
                <div className="mb-4">
                    <label className="block text-left mb-1 text-darkBlue">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="w-full p-2 border rounded-custom shadow-custom border-darkBlue"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-left mb-1 text-darkBlue">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 border rounded-custom shadow-custom border-darkBlue"
                    />
                </div>
                {error && <p className="text-error mt-1 mb-4">{error}</p>}
                <button
                    onClick={handleLogin}
                    className="w-full mb-4 p-2 text-white border-none rounded-custom shadow-custom bg-darkBlue"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate("/create-profile")}
                    className="w-full p-2 text-white border-none rounded-custom shadow-custom bg-mediumBlue"
                >
                    Create Profile
                </button>
                {showTimeoutMessage && (
                    <div className="text-error mt-6 text-center">
                        Session timed out
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
