import axios from 'axios';
import { URL } from '../data/URL';

export const registrarAuto = async (formData) => {
    try {
      const response = await axios.post(`${URL}/autos`, formData);
      return response.data;
    } catch (error) {
      alert('Error al registrar el auto:', error);
      throw error;
    }
  };

  export const eliminarAuto = async(id_auto) =>{
    try {
      const response = await axios.delete(`${URL}/autos/${id_auto}`);
      return response.data;
    } catch (error) {
      alert('Error al eliminar el auto:', error);
      throw error;
    }
  }