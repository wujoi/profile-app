import { parsePhoneNumberFromString } from "libphonenumber-js";

export const formatPhoneNumberStorage = (phoneNumber) => {
    const parsedNumber = parsePhoneNumberFromString(phoneNumber);
    return parsedNumber ? parsedNumber.format("E.164") : phoneNumber;
};

export const formatPhoneNumberDisplay = (phoneNumber) => {
    const parsedNumber = parsePhoneNumberFromString(phoneNumber);
    if (!parsedNumber) return phoneNumber;

    const countryCode = parsedNumber.countryCallingCode;
    const nationalNumber = parsedNumber.formatNational();

    return `+${countryCode} ${nationalNumber}`;
};