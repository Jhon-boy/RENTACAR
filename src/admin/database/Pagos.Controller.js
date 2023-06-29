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
