import { URL } from '../data/URL';
import axios from 'axios';

export const crearHistorial = async(historial) =>{
    try {
        const response = await axios.post(`${URL}/historial`, historial);
        return response.data;
    } catch (error) {
        console.log( error);
        throw error;
    }
}