import axios from 'axios';

export async function postRequestLocal(url, requestBody) {
    try {
        const response = await axios.post(`/api/${url}`, requestBody);
        console.log('post response:', response);
        return response;
    } catch (error) {
        console.error('postRequest error:', error);
        // Throw a new error with a descriptive message
        throw new Error('Failed to send POST request');
    }
}

export async function apiGetLocal(url) {
    try {
        return await axios.get(
            `/api/${url}`,
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
