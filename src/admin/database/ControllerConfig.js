import { URL } from '../data/URL';
import axios from 'axios';

export const EditConfig = async (data) => {
    console.log(data);
    try {
        const response = await axios.put(`${URL}/config`, data);
        return response.data;
    } catch (error) {
        console.log( error);
        throw error;
    }
};
