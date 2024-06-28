import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

import ProfileForm from "../components/ProfileForm";
import {
    handleChange,
    handlePhoneChange,
    validateForm,
} from "../utils/profileHelpers";
import { formatPhoneNumberStorage } from "../utils/formatHelpers";
import { getColorClass } from "../utils/colorHelpers";

const EditProfile = ({
    localProfiles,
    setLocalProfiles,
    currentUser,
    setCurrentUser,
}) => {
    const navigate = useNavigate();
    const existingProfile = localProfiles.find(
        (profile) => profile.email === currentUser
    );
    const titleClass = getColorClass(
        existingProfile ? existingProfile.favoriteColor : null
    );

    const [profile, setProfile] = useState(
        existingProfile || {
            email: "",
            password: "",
            fullName: "",
            phoneNumber: "",
            favoriteColor: "",
        }
    );
    const [originalPassword, setOriginalPassword] = useState(
        existingProfile ? existingProfile.password : ""
    );
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [emailInUse, setEmailInUse] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        setIsFormValid(validateForm(profile, errors));
    }, [errors, profile]);

    const handleSubmit = () => {
        if (isFormValid) {
            const emailExists = localProfiles.some(
                (localProfile) =>
                    localProfile.email === profile.email &&
                    localProfile.email !== existingProfile.email
            );

            if (emailExists) {
                setEmailInUse(true);
                return;
            }

            // Only hash if password has changed
            const hashedPassword =
                profile.password === originalPassword
                    ? originalPassword
                    : CryptoJS.SHA256(profile.password).toString();

            const newProfile = {
                ...profile,
                password: hashedPassword,
            };

            if (profile.phoneNumber) {
                newProfile.phoneNumber = formatPhoneNumberStorage(
                    profile.phoneNumber
                );
            }

            const updatedProfiles = localProfiles.map((localProfile) =>
                localProfile.email === existingProfile.email
                    ? newProfile
                    : localProfile
            );

            setLocalProfiles(updatedProfiles);
            setCurrentUser(profile.email);
            navigate("/view-profile");
        }
    };

    return (
        <ProfileForm
            title={`Edit ${profile.fullName} Profile`}
            titleClass={titleClass}
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
            allowCancel={true}
        />
    );
};

export default EditProfile;
