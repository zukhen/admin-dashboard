import CryptoJS from 'crypto-js';

const secretKey = '1234567890ASDFTGYhu34567uiERCTVYBUNIMCVBN';

// Encode data
export const encryptData = (data: any): string => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
};

// Decode data
export const decryptData = (encryptedData: any): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error:any) {
    // Xử lý lỗi khi giải mã không thành công
    console.error('Invalid Decryption:', error.message);
    return null;
  }
};
