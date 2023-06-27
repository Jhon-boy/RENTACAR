import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Home.css';
import '../styles/Autos.css';
import { URL } from '../data/URL';
import { IMAGE } from '../data/URL';
// eslint-disable-next-line react/prop-types, no-unused-vars
const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line react/prop-types
  const totalImages = images.length;

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1));
  };

  return (
    <div className="slider-container">
      <div className="slider-image-container">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      </div>
      <div className="slider-buttons">
        <button className="slider-button prev" onClick={goToPrevSlide}>
          Prev
        </button>
        <button className="slider-button next" onClick={goToNextSlide}>
          Next
        </button>
      </div>
    </div>
  );
};

export const CardAutos = () => {
  const [cars, setCars] = useState([]);

  const { id } = useParams();
  React.useEffect(() => {
    fetch(`${URL}/autos/${id}`)
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.log(error));
  }, [id]);


  return (
    <div className="page-content">
      <div className="home-container">
        <h1>EL ID DEL AUTO ES: {id}</h1>
        <div className="Mostrar">
          <div className="portada">
          <img src={`${IMAGE}/${cars.fotos}`} />
            
            <div>
              <h1>Marca: {cars.modelo}</h1>
              <h3>Precio por Dia: {cars.precio}</h3>
            </div>
          </div>

          <div className="descripcion">
            <div>
              <h2>Placas: {cars.placas}</h2>
            </div>
            <div>
              <h2>Modelo: {cars.modelo}</h2>
            </div>
            <div>
              <h2>Año: {cars.anio}</h2>
            </div>
            <div>
              <h2>Estado: {cars.estado}</h2>
            </div>
            <div>
              <h2>Tipo: {cars.tipo}</h2>
            </div>
            <div>
              <h2>Detalles: {cars.detalles}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
