import axios from 'axios';

export const obtenerModelosAutos = async () => {
    try {
        const response = await axios.get('https://www.carqueryapi.com/api/0.3/?cmd=getModels');
        const data = response.data;
    
        if (data.Models) {
          const modelos = data.Models.map((modelo) => modelo.model_name);
          return modelos;
        }
      } catch (error) {
        console.error('Error al obtener los modelos de autos:', error);
        return [];
      }
  };