import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { CardAuto } from './CardAuto';
import { URL } from '../data/URL';
import '../styles/Cars.css';
import Footer from './Footer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { vehicleTypes } from '../data/TipoAuto';

export const Cars = () => {
  const [autos, setAutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null); // Cambiado a null

  useEffect(() => {
    fetch(`${URL}/autos`)
      .then(response => response.json())
      .then(data => setAutos(data))
      .catch(error => console.log(error));
  }, []);

  const handleSearchChange = (event, value) => {
    setSearchTerm(value || ''); // Si el valor es null, establecer una cadena vacía
  };

  // Filtrar autos por término de búsqueda
  const filteredAutos = autos.filter(
    (auto) =>
      auto.marca.toLowerCase().includes(searchTerm?.toLowerCase() || '') || // Agregado el operador opcional para evitar errores
      auto.modelo.toLowerCase().includes(searchTerm?.toLowerCase() || '') || // Agregado el operador opcional para evitar errores
      auto.tipo.toLowerCase().includes(searchTerm?.toLowerCase() || '') // Agregado el operador opcional para evitar errores
  );

  return (
    <div className='contenedor-house'>
      <div className="house">
        <div className='Buscador'>
          <Autocomplete
            className='search'
            disablePortal
            id="combo-box-demo"
            options={vehicleTypes}
            value={searchTerm}
            onChange={handleSearchChange}
            renderInput={(params) => <TextField {...params} label="Tipo Vehiculo" />}
          />
        </div>
        <div className="card-autos">
          <Grid container spacing={2}>
            {filteredAutos.map((auto) => (
              <Grid item key={auto.id_auto}>
                <CardAuto auto={auto} key={auto.id_auto} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
};
