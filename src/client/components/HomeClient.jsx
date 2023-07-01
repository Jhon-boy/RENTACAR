import '../styles/Home.css'
import { CardAuto } from './CardAuto'
import { URL } from '../data/URL'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';

export const HomeClient = () => {
    const [autos, setAutos] = useState([]);

    useEffect(() => {
        fetch(`${URL}/autos`)
            .then(response => response.json())
            .then(data => setAutos(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className='home-content'>
            <div className='home-container'>
                Home AQUI VA A IR TODO
                <Grid container spacing={-20}>
                    {autos.map(auto => (
                        <Grid item xs={12} sm={3} md={4} key={auto.id_auto}>
                            <CardAuto auto={auto} key={auto.id_auto} />
                        </Grid>
                    ))}
                </Grid>

            </div>
        </div>
    );
};
