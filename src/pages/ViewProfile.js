import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../utils/authHelpers";
import { formatPhoneNumberDisplay } from "../utils/formatHelpers";
import { getColorClass } from "../utils/colorHelpers";

const ViewProfile = ({
    localProfiles,
    currentUser,
    setLocalProfiles,
    setCurrentUser,
}) => {
    const navigate = useNavigate();

    const profile = localProfiles.find(
        (localProfile) => localProfile.email === currentUser
    );
    const favoriteColor = getColorClass(profile ? profile.favoriteColor : null);

    if (!currentUser) {
        navigate("/");
        return null;
    }

    const handleDelete = () => {
        if (
            window.confirm(
                `Are you sure you want to permanently delete your profile? This action cannot be undone.`
            )
        ) {
            const updatedProfiles = localProfiles.filter(
                (localProfile) => localProfile.email !== profile.email
            );
            setLocalProfiles(updatedProfiles);
            localStorage.removeItem("currentUser");
            navigate("/");
        }
    };

    const formatColor = (color) => {
        return color.charAt(0).toUpperCase() + color.slice(1);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen sm:bg-darkBlue">
            <div className="w-full sm:max-w-[80%] md:max-w-md p-8 border-none sm:border border-darkBlue rounded-none sm:rounded-custom shadow-none sm:shadow-custom bg-white min-h-screen sm:min-h-fit sm:m-auto">
                <h1
                    className={`text-2xl font-bold mb-6 ${favoriteColor}`}
                >
                    {profile.fullName} Profile
                </h1>
                <div className="mb-4">
                    <p className="text-darkBlue">
                        <strong>Email:</strong> {profile.email}
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-darkBlue">
                        <strong>Full Name:</strong> {profile.fullName}
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-darkBlue">
                        <strong>Phone Number:</strong>{" "}
                        {formatPhoneNumberDisplay(
                            profile.phoneNumber
                        ) || "-"}
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-darkBlue">
                        <strong>Favorite Color:</strong>{" "}
                        <span className={`${favoriteColor}`}>
                            {formatColor(profile.favoriteColor)}
                        </span>
                    </p>
                </div>
                <button
                    onClick={() => navigate("/edit-profile")}
                    className="w-full p-2 text-white border-none rounded-custom shadow-custom bg-darkBlue"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="mt-3 w-full p-2 text-red border border-red rounded-custom shadow-custom hover:bg-red hover:text-white"
                >
                    Delete
                </button>
                <div
                    onClick={() => logout(setCurrentUser, navigate)}
                    className="cursor-pointer text-darkBlue text-xs underline text-center mt-6"
                >
                    Logout
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;
