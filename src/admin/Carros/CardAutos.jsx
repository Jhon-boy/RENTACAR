import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
//import '../Home.css';
//import '../styles/Autos.css';
import { URL } from '../data/URL';
import { IMAGE } from '../data/URL';
import stil from './CardAuto.module.css'

// eslint-disable-next-line react/prop-types, no-unused-vars
/*const Slider = ({ images }) => {
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
    <section className="">
      <div className="">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      </div>
      <div className="">
        <button className="" onClick={goToPrevSlide}>
          Prev
        </button>
        <button className="" onClick={goToNextSlide}>
          Next
        </button>
      </div>
    </section>
  );
};*/

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
    <section className={stil.contentAuto}>
        <span className={stil.infoLabel}><strong>ID:</strong>#{id}</span>
        <img className={stil.imgInfo} src={`${IMAGE}/${cars.fotos}`} />
        <span className={stil.infoLabel}><strong>PRECIO POR DÍA:</strong>{cars.precio}</span>
        <span className={stil.infoLabel}><strong>MARCA:</strong>{cars.modelo}</span>
        <span className={stil.infoLabel}><strong>PlACAS:</strong>{cars.placas}</span>
        <span className={stil.infoLabel}><strong>MODELO:</strong>{cars.modelo}</span>
        <span className={stil.infoLabel}><strong>AÑO:</strong>{cars.anio}</span>
        <span className={stil.infoLabel}><strong>ESTADO:</strong>{cars.estado}</span>
        <span className={stil.infoLabel}><strong>TIPO:</strong>{cars.tipo}</span>
        <span className={stil.infoLabel}><strong>DETALLES:</strong>{cars.detalles}</span>
    </section>
  );
};
