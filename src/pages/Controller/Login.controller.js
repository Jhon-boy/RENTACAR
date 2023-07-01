
import axios from "axios";
import { URL } from "../../client/data/URL";

export const LoginUser = async (usuario) => {
    try {
      const response = await axios.post(`${URL}/login`, usuario);
      return response.data; // Devuelve los datos recibidos del servidor
    } catch (error) {
      console.log(error);
      throw new Error('Error en la solicitud de inicio de sesión'); // Lanza una excepción en caso de error
    }
  }
  