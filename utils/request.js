import axios from 'axios';

export async function postRequest(url, body) {
    body.url = url;
    try {
        return await axios.post(
            `/api/handle-credentials`,
            body,
        );
    } catch (error) {
        console.error(error);
        throw new Error('postRequest', { postRequest });
    }
}

export async function proofRequest(proofID) {
    try {
        return await axios.get(
            `/api/handle-proof?proofID=${proofID}`,
        );
    } catch (error) {
        console.error(error);
        throw new Error('getRequest', { postRequest });
    }
}
