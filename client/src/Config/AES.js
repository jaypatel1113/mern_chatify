import CryptoJS from "crypto-js";

export const encryptMsg = (secretKey, msg) => {
    const ciphertext = CryptoJS.AES.encrypt(msg, secretKey).toString();
    // console.log(ciphertext);
    return ciphertext
};

export const decryptMsg = (secretKey, ciper) => {
    const originalText = CryptoJS.AES.decrypt(ciper, secretKey).toString(CryptoJS.enc.Utf8);
    // console.log(originalText);
    return originalText;
}
