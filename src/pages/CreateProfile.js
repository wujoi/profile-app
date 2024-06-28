import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

import ProfileForm from "../components/ProfileForm";
import { getCurrentUserFromLocalStorage, logout } from "../utils/authHelpers";
import {
    handleChange,
    handlePhoneChange,
    validateForm,
} from "../utils/profileHelpers";
import { formatPhoneNumberStorage } from "../utils/formatHelpers";

const CreateProfile = ({ localProfiles, setLocalProfiles, setCurrentUser }) => {
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [emailInUse, setEmailInUse] = useState(false);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        email: "",
        password: "",
        fullName: "",
        phoneNumber: "",
        favoriteColor: "",
    });

    useEffect(() => {
        const user = getCurrentUserFromLocalStorage();
        if (user) {
            logout(setCurrentUser, navigate);
        }
    }, [setCurrentUser, navigate]);

    useEffect(() => {
        setIsFormValid(validateForm(profile, errors));
    }, [errors, profile]);

    const handleSubmit = () => {
        if (isFormValid) {
            const emailExists = localProfiles.some(
                (localProfile) => localProfile.email === profile.email
            );

            if (emailExists) {
                setEmailInUse(true);
                return;
            }

            const hashedPassword = CryptoJS.SHA256(profile.password).toString();

            const newProfile = {
                ...profile,
                password: hashedPassword,
            };
            if (profile.phoneNumber) {
                newProfile.phoneNumber = formatPhoneNumberStorage(
                    profile.phoneNumber
                );
            }
            const updatedProfiles = [...localProfiles, newProfile];
            setLocalProfiles(updatedProfiles);
            setCurrentUser(profile.email);
            localStorage.setItem("currentUser", profile.email);
            navigate("/view-profile");
        }
    };

    return (
        <ProfileForm
            title="Create Profile"
            profile={profile}
            errors={errors}
            handleChange={(e) =>
                handleChange(e, profile, setProfile, setErrors, setEmailInUse)
            }
            handlePhoneChange={(value) =>
                handlePhoneChange(value, profile, setProfile, setErrors)
            }
            handleSubmit={handleSubmit}
            isFormValid={isFormValid}
            emailInUse={emailInUse}
        />
    );
};

export default CreateProfile;
