import { RSAKey } from './Rsa';

/**
 * 비밀번호를 RSA 암호화하는 서비스 함수
 * @param {string} password
 * @param {string} modulus
 * @param {string} exponent
 * @returns {string} 암호화된 비밀번호
 */
export const encryptPassword = (password, modulus, exponent) => {
    const rsaKey = new RSAKey();
    rsaKey.setPublic({ modulus, exponent });
    return rsaKey.encrypt(password);
};
