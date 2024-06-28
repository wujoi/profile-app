import { validateField } from "./validationHelpers";

export const handleChange = (
    e,
    profile,
    setProfile,
    setErrors,
    setEmailInUse
) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    if (name === "email") {
        setEmailInUse(false);
    }
};

export const handlePhoneChange = (value, profile, setProfile, setErrors) => {
    setProfile({ ...profile, phoneNumber: value });
    const error = validateField("phoneNumber", value);
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: error }));
};

export const validateForm = (profile, errors) => {
    const allFieldsValid = Object.keys(errors).every((key) => !errors[key]);
    const allFieldsFilled =
        profile.email.trim() !== "" &&
        profile.password.trim() !== "" &&
        profile.fullName.trim() !== "" &&
        profile.favoriteColor.trim() !== "";
    return allFieldsValid && allFieldsFilled;
};
