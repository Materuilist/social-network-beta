export const getPhone = (maskedPhone) => {
    let unmaskedPhone = "";
    for (const digit of maskedPhone.matchAll(/\d/g)) {
        unmaskedPhone += digit;
    }
    return unmaskedPhone;
};

export const checkPhoneValidity = (maskedPhone) =>
    getPhone(maskedPhone).length === 11;
