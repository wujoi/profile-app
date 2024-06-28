import { parsePhoneNumberFromString } from "libphonenumber-js";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[^A-Za-z\d]).{10,32}$/;
    return regex.test(password);
};

export const validateFullName = (fullName) => {
    return fullName.trim().length >= 3;
};

export const validatePhoneNumber = (phoneNumber) => {
    const parsedNumber = parsePhoneNumberFromString(phoneNumber);
    if (!parsedNumber) {
        return false;
    }
    if (parsedNumber.country === "US") {
        return (
            parsedNumber.isValid() && parsedNumber.nationalNumber.length === 10
        );
    }
    return parsedNumber.isValid();
};

export const validateField = (name, value) => {
    let error = "";
    switch (name) {
        case "email":
            if (!validateEmail(value)) {
                error = "Please enter a valid email address.";
            }
            break;
        case "password":
            if (!validatePassword(value)) {
                error =
                    "Password must be 10-32 characters long, contain at least 2 uppercase letters, 2 numbers, and 1 special character.";
            }
            break;
        case "fullName":
            if (!validateFullName(value)) {
                error =
                    "Please enter a valid name (must be at least 3 characters long).";
            }
            break;
        case "phoneNumber":
            if (value && !validatePhoneNumber(value)) {
                error = "Please enter a valid phone number.";
            }
            break;
        default:
            break;
    }
    return error;
};
