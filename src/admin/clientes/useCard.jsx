/* eslint-disable react/prop-types */

import { IMAGE } from '../data/URL';
import { URL } from '../data/URL';
import axios from 'axios';
import '../Home.css';
import '../styles/Cliente.css'
import { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaChevronLeft, FaChevronRight, FaCheck, FaTimes } from 'react-icons/fa';
import { BsFillExclamationTriangleFill, BsFillPersonCheckFill, BsFillPersonXFill } from 'react-icons/bs';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
/* Agrega estilos personalizados si es necesario */



const UserCard = ({ cliente }) => {
  const [licencias, setLicencias] = useState([]);
  const [translateValue, setTranslateValue] = useState(0);

  const handlePrevSlide = () => {
    const carouselContent = document.querySelector('.carousel-content');
    const slideWidth = carouselContent.clientWidth;
    const numSlides = carouselContent.childElementCount;
    const maxTranslateValue = slideWidth * (numSlides - 1);

    if (translateValue === 0) {
      setTranslateValue(maxTranslateValue);
    } else {
      setTranslateValue(translateValue + slideWidth);
    }
  };

  const handleNextSlide = () => {
    const carouselContent = document.querySelector('.carousel-content');
    const slideWidth = carouselContent.clientWidth;
    const numSlides = carouselContent.childElementCount;
    const maxTranslateValue = slideWidth * (numSlides - 1);

    if (translateValue === maxTranslateValue) {
      setTranslateValue(0);
    } else {
      setTranslateValue(translateValue - slideWidth);
    }
  };

  const VerLicencia = async (id) => {
    const response = await axios.get(`${URL}/licencia/${id}`);
    const data = response.data;
    setLicencias(data);
  };
  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'HABILITADO':
        return <BsFillPersonCheckFill className="icon-habilitado" />;
      case 'NO HABILITADO':
        return <BsFillPersonXFill className="icon-no-habilitado" />;
      case 'PENDIENTE':
        return <BsFillExclamationTriangleFill className="icon-pendiente" />;
      default:
        return null;
    }
  };
  const estadoLicencia= (estado) => {
    if (estado) {
      return <FaCheck className="icon-habilitado" />;
    } else {
      return <FaTimes className="icon-no-habilitado" />;
    }
  };

  useEffect(() => {
    VerLicencia(cliente.id_licencia);
  }, []);

  return (
    <div className='home-container'>
      <div className='home-container'>
        <div className="user-card">
          <center>
            <div className="SliderImages">
              <div className="carousel-content" style={{ transform: `translateX(${translateValue}px)` }}>
                <div className="carousel-item">
                  <img src={`${IMAGE}/${cliente.foto}`} alt="Portada" className="user-card-image" />
                  <p className="legend">Cliente</p>
                </div>
                <div className="carousel-item">
                  <img src={`${IMAGE}/${licencias.fotolicencia}`} alt="Portada" className="user-card-image" />
                  <p className="legend">Licencia</p>
                </div>
              </div>
            </div>
            <div className='btnSlider'>
              <div>
                <FaChevronRight className="carousel-button carousel-button-right" onClick={handleNextSlide} />
              </div>
              <div>
                <FaChevronLeft className="carousel-button carousel-button-left" onClick={handlePrevSlide} />
              </div>
            </div>
          </center>

          <div className="user-card-content">
            <div className="user-card-row">
              <h2 className="user-card-title">
                {cliente.nombre} {cliente.apellido} {' - '}
                 <span>{getStatusIcon(cliente.estado)}</span>
              </h2>
            </div>
            <div className="user-card-row">
              <div className="user-card-column">
                <label className="user-card-label">
                  ID:
                  <input
                    className="user-card-input"
                    type="text"
                    value={cliente.id_cliente}
                    readOnly
                  />
                </label>
              </div>
              <div className="user-card-column">
                <label className="user-card-label">
                  Cédula:
                  <input
                    className="user-card-input"
                    type="text"
                    value={cliente.cedula}
                    readOnly
                  />
                </label>
              </div>
              <div className="user-card-column">
                <label className="user-card-label">
                  Género:
                  <input
                    className="user-card-input"
                    type="text"
                    value={cliente.genero}
                    readOnly
                  />
                </label>
              </div>
            </div>
            <div className="user-card-row">
              <div className="user-card-column">
                <label className="user-card-label">
                  Licencia:
                  <input
                    className="user-card-input"
                    type="text"
                    value={cliente.id_licencia}
                    readOnly
                  />
                </label>
              </div>
              <div className="user-card-column">
                <label className="user-card-label">
                  Categoría:
                  <input
                    className="user-card-input"
                    type="text"
                    value={licencias.categoria}
                    readOnly
                  />
                </label>
              </div>
              <div className="user-card-column">
                <label className="user-card-label">
                  Estado
                  <div className="estado-icon">{estadoLicencia(licencias.estado)}</div>
                </label>
              </div>
            </div>
            <div className='btnSlider'>
              <Button variant="contained"   endIcon={<SendIcon />}>Detalles </Button> 
              <span> { ' - '}</span>
            <Button  variant="contained" >Ver Historial</Button>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
};
export default UserCard;
