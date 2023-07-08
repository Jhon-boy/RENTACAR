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

export const fetchClientes = () => {
    const options = { method: 'GET' };
  
    return fetch('http://localhost:4000/apiCar/clientes', options)
      .then(response => response.json())
      .then(response => response)
      .catch(err => {
        console.error(err);
        return null;
      });
  };
  
  export const ActualizarCredencial = async (id_Admin, user) => {
    try {
        const response = await axios.put(`${URL}/user/${id_Admin}`, user);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

  