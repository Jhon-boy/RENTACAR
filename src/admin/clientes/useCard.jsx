/* eslint-disable react/prop-types */

import { IMAGE } from '../data/URL';
import { URL } from '../data/URL';
import axios from 'axios';
//import '../Home.css';
//import '../styles/Cliente.css'
import { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {   FaCheck, FaTimes } from 'react-icons/fa';
import { BsFillExclamationTriangleFill, BsFillPersonCheckFill, BsFillPersonXFill } from 'react-icons/bs';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


/* Agrega estilos personalizados si es necesario */



const UserCard = ({ cliente }) => {
  const [licencias, setLicencias] = useState([]);
  // =====================00 MATERIAL UI =================

  const images = [
    {
      label: 'Foto de la licencia',
      imgPath: `${IMAGE}/${licencias.fotolicencia}`,
    },
    {
      label: 'Cedula',
      imgPath: `${IMAGE}/${cliente.foto}`,
    },
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
  const estadoLicencia = (estado) => {
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
            <Box sx={{ maxWidth: 270, flexGrow: 1 }}>
              <Paper
                square
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 30,
                  pl: 3,
                  bgcolor: 'background.default',
                }}
              >
                <Typography>{images[activeStep].label}</Typography>
              </Paper>
              <Box
                component="img"
                sx={{
                  height: 205,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={images[activeStep].imgPath}
                alt={images[activeStep].label}
              />
              <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                    Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                  </Button>
                }
              />
            </Box>
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
              <Button variant="contained" endIcon={<SendIcon />}>Detalles </Button>
              <span> {' - '}</span>
              <Button variant="contained" >Ver Historial</Button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
export default UserCard;
