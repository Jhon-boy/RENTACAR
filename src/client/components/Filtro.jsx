import React, { useState } from 'react';
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
    <aside id="sidebar">
      <div className="container-filtro">
        <div>
          <div>
            <div>
              <h3 className="a-title active">CATEGORÍA</h3>
              <div className="a-content">
                <div className="input-wrapper">
                  <input type="checkbox" className="checkbox-mini" value="MINI" onChange={handleCategoryFilterChange} />
                  <label htmlFor="checkbox-mini">MINI</label>
                </div>
                <div className="input-wrapper">
                  <input type="checkbox" className="checkbox-economico" value="ECONÓMICO" onChange={handleCategoryFilterChange} />
                  <label htmlFor="checkbox-economico">ECONÓMICO</label>
                </div>
                <div className="input-wrapper">
                  <input type="checkbox" className="checkbox-economico" value="ECONÓMICO" onChange={handleCategoryFilterChange} />
                  <label htmlFor="checkbox-economico">COMPACTO</label>
                </div>
                <div className="input-wrapper">
                  <input type="checkbox" className="checkbox-economico" value="ECONÓMICO" onChange={handleCategoryFilterChange} />
                  <label htmlFor="checkbox-economico">INTERMEDIO</label>
                </div>
                <div className="input-wrapper">
                  <input type="checkbox" className="checkbox-economico" value="ECONÓMICO" onChange={handleCategoryFilterChange} />
                  <label htmlFor="checkbox-economico">PREMIUN</label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion toggle no-of">
            <div className="accordion-item">
              <h3 className="a-title active">TRANSMISIÓN</h3>
              <div className="a-content">
                <div className="input-wrapper">
                  <input type="checkbox" className="checkbox-AUTOMATICA" value="AUTOMATICA" onChange={handleTransmissionFilterChange} />
                  <label htmlFor="checkbox-AUTOMATICA">AUTOMATICA</label>
                </div>
                <div className="input-wrapper">
                  <input type="checkbox" className="checkbox-MANUAL" value="MANUAL" onChange={handleTransmissionFilterChange} />
                  <label htmlFor="checkbox-MANUAL">MANUAL</label>
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
