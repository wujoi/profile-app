import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Reusable component to create and edit profile
const ProfileForm = ({
    title,
    titleClass,
    allowCancel,
    profile,
    errors,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    isFormValid,
    emailInUse,
}) => {
    const [touched, setTouched] = useState({});
    const navigate = useNavigate();

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    };

    const handlePhoneBlur = () => {
        setTouched((prevTouched) => ({ ...prevTouched, phoneNumber: true }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen sm:bg-darkBlue">
            <div className="w-full sm:max-w-[80%] p-8 border-none sm:border rounded-none sm:rounded-custom shadow-none sm:shadow-custom bg-white min-h-screen sm:min-h-fit sm:m-auto">
                <h1
                    className={`text-2xl font-bold mb-6 ${titleClass}`}
                >
                    {title}
                </h1>
                <div className="mb-4">
                    <label className="block text-left mb-1 text-darkBlue">
                        Email
                        <span className="text-error ml-1">*</span>
                    </label>
                    <input
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="example@email.com"
                        disabled={title === "Edit Profile"}
                        className={`w-full p-2 border rounded-custom shadow-custom ${touched.email && errors.email ? "border-error" : "border-darkBlue"}`}
                    />
                    {touched.email && errors.email && (
                        <p className="text-error mt-1 text-xs">
                            {errors.email}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-left mb-1 text-darkBlue">
                        Password
                        <span className="text-error ml-1">*</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        value={profile.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                        className={`w-full p-2 border rounded-custom shadow-custom ${touched.password && errors.password ? "border-error" : "border-darkBlue"}`}
                    />
                    {touched.password && errors.password && (
                        <p className="text-error mt-1 text-xs">
                            {errors.password}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-left mb-1 text-darkBlue">
                        Full Name
                        <span className="text-error ml-1">*</span>
                    </label>
                    <input
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Jane Doe"
                        className={`w-full p-2 border rounded-custom shadow-custom ${touched.fullName && errors.fullName ? "border-error" : "border-darkBlue"}`}
                    />
                    {touched.fullName && errors.fullName && (
                        <p className="text-error mt-1 text-xs">
                            {errors.fullName}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-left mb-1 text-darkBlue">
                        Phone Number
                    </label>
                    <PhoneInput
                        international
                        defaultCountry="US"
                        value={profile.phoneNumber}
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                        className={`w-full p-2 border rounded-custom shadow-custom ${touched.phoneNumber && errors.phoneNumber ? "border-error" : "border-darkBlue"}`}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                        <p className="text-error mt-1 text-xs">
                            {errors.phoneNumber}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-left mb-1 text-darkBlue">
                        Favorite Color
                        <span className="text-error ml-1">*</span>
                    </label>
                    <select
                        name="favoriteColor"
                        value={profile.favoriteColor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border border-darkBlue rounded-custom shadow-custom"
                    >
                        <option value="">Select a color</option>
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="purple">Purple</option>
                        <option value="black">Black</option>
                        <option value="orange">Orange</option>
                    </select>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`w-full p-2 text-white border-none rounded-custom shadow-custom ${isFormValid ? "bg-darkBlue" : "bg-gray"}`}
                >
                    Save Profile
                </button>
                {allowCancel && (
                    <button
                        onClick={() => { navigate("/view-profile")}}
                        className="mt-3 w-full p-2 text-red border border-red rounded-custom shadow-custom hover:bg-red hover:text-white"
                    >
                        Cancel
                    </button>
                )}
                {emailInUse && (
                    <div className="text-error mt-3">
                        This email is already is use. Please{" "}
                        <Link to="/" className="text-darkBlue underline">
                            login
                        </Link>{" "}
                        or enter a new email address.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileForm;
