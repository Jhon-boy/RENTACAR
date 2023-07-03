import axios from 'axios';
import { URL } from '../data/URL';
export const Salir = async () => {
    try {
        const credentials = JSON.parse(localStorage.getItem('credentials')); // Obtén las credenciales del almacenamiento local
        const token = credentials.token; // Obtén el token de las credenciales
        const response = await axios.post(`${URL}/logOut`, null, {
            headers: {
                Authorization: token
            }
        });
        console.log(response.data.message); // Mensaje de éxito o aviso
    } catch (error) {
        console.error(error.response.data.message); // Mensaje de error
    }
};

  