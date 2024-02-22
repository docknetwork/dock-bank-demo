import axios from 'axios';
import { SERVER_URL } from './constants';

export async function postRequest(url, body) {
    body.url = url;
    try {
        return await axios.post(
            `${SERVER_URL}/api/handle-credentials`,
            body,
        );
    } catch (error) {
        console.error(error);
        throw new Error('postRequest', { postRequest });
    }
}
