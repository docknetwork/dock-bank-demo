import axios from 'axios';

/**
 * Sends a POST request to the specified URL with the given body.
 * @param {string} url - The URL to send the POST request to.
 * @param {object} body - The body of the POST request.
 * @returns {Promise} A Promise that resolves with the response data if successful.
 * @throws {Error} If an error occurs during the request.
 */
export async function postRequest(url, body) {
    try {
        const requestBody = { ...body, url };
        const response = await axios.post(`/api/handle-credentials`, requestBody);
        console.log('post response:', response);
        return response;
    } catch (error) {
        console.error('postRequest error:', error);
        // Throw a new error with a descriptive message
        throw new Error('Failed to send POST request');
    }
}

export async function apiGet(url) {
    try {
        return await axios.get(
            `/api/handle-get?url=${url}`,
        );
    } catch (error) {
        console.error(error);
        throw new Error('getRequest Error');
    }
}

export async function proofRequest(proofID) {
    try {
        return await axios.get(
            `/api/handle-proof?proofID=${proofID}`,
        );
    } catch (error) {
        console.error(error);
        throw new Error('get proofRequest error');
    }
}
