/* eslint-disable react/prop-types */
import '../styles/Home.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

import { IMAGE } from '../data/URL';

export const CardAuto = ({ auto }) => {
    const renderButton = () => {
        if (auto.estado === 'OCUPADO' || auto.estado === 'MATENIMIENTO') {
            return (
                <Button variant="contained" size="large" >
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

    if (auto.estado === 'FUERA DE SERVICIO') {
        return null;
    }

    return (
        <div className='home-content'>
            <div>
                <Card sx={{ width: 345 }}>
                    <CardMedia
                        component="img"
                        height="204"
                        image={`${IMAGE}/${auto.fotos}`}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Disponible Ahora
                        </Typography>
                        <Typography variant="h7" component="div">
                            {auto.marca} - {auto.modelo}
                        </Typography>
                        <Typography variant="h6">
                            {auto.precio} - {auto.estado}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {renderIcon()}
                        {renderButton()}
                    </CardActions>
                </Card>

            </div>
        </div>
    )
}
