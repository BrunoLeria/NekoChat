export const addWhatsAppKey = (phone_number) => {
    return "55" + phone_number + "@s.whatsapp.net";
};

export const removeWhatsAppKey = (phone_number) => {
    return phone_number.replace("@s.whatsapp.net", "").slice(2);
};

export const formatPhoneNumber = (phone_number) => {
    phone_number = removeWhatsAppKey(phone_number).replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
    console.log(phone_number);
    return phone_number;
};
