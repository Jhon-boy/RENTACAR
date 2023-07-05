import axios from "axios";
import { URL } from "../data/URL";

export const CrearReserva = async (reserva) => {
    try {
        const response = await axios.post(`${URL}/reservas`, reserva);
        return response.data;

    } catch (error) {
        console.log(error);
    }
};