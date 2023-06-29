import { URL } from '../data/URL';
import axios from 'axios';
export const eliminarCliente = async (id) => {
    try {
        const response = await axios.delete(`${URL}/clientes/${id}`);
        return response.data;
      } catch (error) {
        console.log('Error al eliminar al cliente:', error);
        throw error;
      }
}

export const editarClient = (id) => {
    alert(id);
}

export const editarEstadoClient = async (id, estado) => {
    console.log(id, estado);
    try {
        const options = {
            method: 'PUT',
            body: JSON.stringify({ estado: estado }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(`${URL}/clientesEstado/${id}`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    } catch (error) {
        console.log(error);
        throw error;
    }
};
