import { URL } from '../data/URL';
import axios from 'axios';


export const CompletarPago = async (pagos) => {
    // console.log(pagos);
    try {
        const response = await axios.post(`${URL}/pagos`, pagos);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const editarEstadoReserva = async (id_, estadoA) => {
    // console.log(estadoA + '->' + id_);
    try {
        const options = {
            method: 'PUT',
            url: `${URL}/reserva/estado/${id_}`,
            data: { id: id_, estado: estadoA }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    } catch (error) {
        alert('ALGO FUE MAL');
    }
};

export const cancelarPago = async (pago, cliente, mensaje) => {
    console.log('ID: ' + cliente + ' id pago: ' + pago + ' mensaje: ' + mensaje);

    try {
        // Ajusta la URL según la ruta correcta de tu servidor y el recurso para cancelar el pago
        const response = await axios.delete(`${URL}/pagos/${pago}`, {
            data: {
                cliente: cliente,
                mensaje: mensaje
            }
        });

        console.log('Respuesta del servidor:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};