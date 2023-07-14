
import { URL } from "../../admin/data/URL";
import axios from "axios";


export const RegistroUsuario = async (user) => {
    try {
        const response = await axios.post(`${URL}/user`, user);
        return response.data.id_usuario;
    } catch (error) {
        console.log('Error al registrar el usuario:', error);
        throw error;
    }
}

export const RegistroLicencia = async (formData2) => {
    try {
        const response = await axios.post(`${URL}/licencia`, formData2);
        return response.data;
    } catch (error) {
        console.log('Error al registrar la licencia:', error.message);
        throw error;
    }

}
export const RegistroCliente = async (formData) => {


    try {
        const response = await axios.post(`${URL}/cliente`, formData);
        return response.data;
    } catch (error) {
        console.log('Error al registrar el cliente:', error.message);
        throw error;
    }

}

export const getCorreos = async (user) => {

    try {
        const response = await axios.post(`${URL}/recuperarContrasena`, user);
        console.log('EXITOSO');
        return response.data;

    } catch (error) {
        console.log('Error al obtener los correos registrados:', error.message);
        return false;
    }
};
