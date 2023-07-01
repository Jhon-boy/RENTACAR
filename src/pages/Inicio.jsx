import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../client/styles/Home.css'
import Grid from '@mui/material/Grid';

import { IMAGE, URL } from '../client/data/URL';
import NavBar from './NavBar';

export const Inicio = () => {
    const [autos, setAutos] = useState([]);

    useEffect(() => {
        fetch(`${URL}/autos`)
            .then(response => response.json())
            .then(data => setAutos(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className='home-content'>
            <NavBar />
            <div className='home-container'>
                <Grid container spacing={-20}>
                    {autos.map(auto => (
                        <Card key={auto.id_auto} sx={{ width: 345 }}>
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
                                {auto.estado === 'DISPONIBLE' ? (
                                    <Button variant="contained" size="large">
                                        Alquilar
                                    </Button>
                                ) : (
                                    <>
                                        <Typography variant="h6">{auto.estado}</Typography>
                                        <Button variant="contained" size="large" disabled>
                                            Próximamente
                                        </Button>
                                    </>
                                )}
                            </CardActions>
                        </Card>
                    ))}
                </Grid>

            </div>
        </div>
    );
};

