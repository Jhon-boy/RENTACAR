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

export const eliminarAuto = async (id_auto) => {
  try {
    const response = await axios.delete(`${URL}/autos/${id_auto}`);
    return response.data;
  } catch (error) {
    alert('Error al eliminar el auto:', error);
    throw error;
  }
}

export const  editarAutoController = async (id, formData) => {
  try {
    const response = await axios.put(`${URL}/autos/${id}`, formData);
    return response.data;
  } catch (error) {
    alert('Error al editar el auto:', error);
    throw error;
  }
};
export const editarAutoFilesController = async (id, cars) => {
  try {
    const response1 = await axios.put(`${URL}/autosfile/${id}`, cars);
    return response1.data;
  } catch (error) {
    alert('Error al editar el auto:', error);
    throw error;
  }
};
export const CambioStadoAuto = async (id_autoA, estadoA) => {
  
  // FUNCIONA PERO ANDO PROBANDO OTRAS COSAS XD
  //try {
  //   const response = await axios.put(`${URL}/autosEstado/${id_auto}`, estado);
  //   return response.data;
  // } catch (error) {
  //   alert('Error al editar el auto:', error);
  //   throw error;
  // }
  try {
    const options = {
      method: 'PUT',
      url: `${URL}/autosEstado/${id_autoA}`,
      data: { id_auto: id_autoA, estado: estadoA }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  } catch (error) {
    alert('ALGO FUE MAL');
  }

}