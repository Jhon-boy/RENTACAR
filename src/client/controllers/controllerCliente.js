import axios from "axios";
import { URL } from "../data/URL";


export const  editarCliente = async (id_cliente, formData) => {
    const id = id_cliente;
    console.log(id, formData);
    try {
      const response = await axios.put(`${URL}/clientes/${id}`, formData);
      return response.data;
    } catch (error) {
      console.log('Error al editar el cliente:', error);
      throw error;
    }
  };
  