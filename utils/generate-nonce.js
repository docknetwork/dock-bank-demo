/**
 * Generates a nonce string.
 *
 * @return {string} The generated nonce string.
 */
export const generateNonce = () => {
    const nonce = Math.floor(100000 + Math.random() * 900000);
    return nonce.toString();
};