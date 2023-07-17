import React from 'react';
import '../styles/Home.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { IMAGE } from '../data/URL';
import { Link } from 'react-router-dom';

export const CardAuto = ({ auto }) => {
    const renderButton = () => {
        if (auto.estado === 'OCUPADO' || auto.estado === 'MATENIMIENTO') {
            return (
                <Button variant="contained" size="large" disabled>
                    Próximamente
                </Button>
            );
        } else if (auto.estado === 'FUERA DE SERVICIO') {
            return null;
        } else {
            return (
                <Button variant="contained" size="large">
                    Alquilar
                </Button>
            );
        }
    };

    const renderIcon = () => {
        if (auto.estado === 'DISPONIBLE') {
            return <CheckIcon />;
        } else if (auto.estado === 'OCUPADO' || auto.estado === 'MATENIMIENTO') {
            return <HourglassEmptyIcon />;
        } else {
            return <CloseIcon />;
        }
    };

    const renderEstado = () => {
        if (auto.estado === 'DISPONIBLE') {
            return 'Disponible';
        } else if (auto.estado === 'OCUPADO') {
            return 'Ocupado';
        }
        else if ( auto.estado === 'MATENIMIENTO') {
            return 'Mantenimiento';
        }
        else {
            return auto.estado;
        }
    };

    return (
        <div className='home-content-cars'>
            <div>
                <Card sx={{ width: 345, height: 430 }}>
                    <CardMedia
                        component="img"
                        height="204"
                        image={`${IMAGE}/${auto.fotos}`}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {renderEstado()}
                            {auto.estado === 'DISPONIBLE' && <span style={{ color: 'green', marginLeft: '5px' }}>●</span>}
                            {(auto.estado === 'OCUPADO' || auto.estado === 'MATENIMIENTO') && <span style={{ color: 'red', marginLeft: '5px' }}>●</span>}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {auto.marca} - {auto.modelo}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} color="text.secondary" component="div">
                            {auto.detalles}
                        </Typography>
                        <Typography variant="h6">
                            <span className='Dinero'>$ </span>{auto.precio} - {auto.estado}
                        </Typography>
                    </CardContent>
                    <Link to={`/cliente/vehiculos/${auto.id_auto}`} className='boton-renta' style={{ marginBottom: '10px' }}>
                        {renderButton()}{renderIcon()}
                    </Link>
                </Card>
            </div>
        </div>
    );
};
