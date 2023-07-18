import '../styles/Home.css'
import { CardAuto } from './CardAuto'
import { URL } from '../data/URL'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Portada from '../components/Portada'
import Footer from '../components/Footer'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Ventaja from '../components/Virtudes'
import TidioChat from '../TidioChat';

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
            <div className="portada">
                <Portada />
            </div>
            <div className="autos">
                <h2 className="title-cars">AUTOS MODERNOS</h2>
                <p className='frase'>¿Cuál auto le interesa? En nuestros autos de renta podemos ayudarle a elegir. Revise cuales son nuestros vehiculos más populares.</p>
                <div className="cards-autos">
                    <Grid className='container-autos' container spacing={2}>
                        {autos.slice(0, 3).map(auto => (
                            <Grid item key={auto.id_auto}>
                                <CardAuto auto={auto} key={auto.id_auto} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className="ver-mas">
                    <Link to="/cliente/vehiculos" >
                        <Button variant="outlined" size="medium"> Ver más </Button>
                    </Link>
                </div>
                <TidioChat />
                <div>
                </div>
            </div>
            <div className="ventajas">
                <Ventaja />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div >
    );
};
