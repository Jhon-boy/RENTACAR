/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../styles/Filtro.css';

const SidebarFilter = ({ applyFilters }) => {
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [transmissionFilters, setTransmissionFilters] = useState([]);

  const handleCategoryFilterChange = (event) => {
    const selectedCategory = event.target.value;
    if (categoryFilters.includes(selectedCategory)) {
      setCategoryFilters(categoryFilters.filter((category) => category !== selectedCategory));
    } else {
      setCategoryFilters([...categoryFilters, selectedCategory]);
    }
  };

  const handleTransmissionFilterChange = (event) => {
    const selectedTransmission = event.target.value;
    if (transmissionFilters.includes(selectedTransmission)) {
      setTransmissionFilters(transmissionFilters.filter((transmission) => transmission !== selectedTransmission));
    } else {
      setTransmissionFilters([...transmissionFilters, selectedTransmission]);
    }
  };

  return (
    <aside id=" ">
      <div className="container-filtro">
        <div>
          <div>
            <div>
              <h3 className="a-title active">CATEGORÍAS DISPONIBLES</h3>
              <div className="a-content">
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-mini">SEDAN</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">COUPE</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">CONVERTIBLE</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">HATCHBACK</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">STATION WAGON</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">MINIVAN</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">CAMIONETA</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">FURGONETA DE PASAJEROS</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">MICROBUS</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">MINIBUS</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">CAMIÓN LIGERO</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">CAMIÓN MEDIANO</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-economico">CAMIÓN PESADO</label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion toggle no-of">
            <div className="accordion-item">
              <h3 className="a-title active">TRANSMISIÓN</h3>
              <div className="a-content">
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-AUTOMATICA">AUTOMATICA</label>
                </div>
                <div className="input-wrapper">
                  <label className='labeltext' htmlFor="checkbox-MANUAL">MANUAL</label>
                </div>
                {/* Agrega el resto de transmisiones aquí */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilter;
