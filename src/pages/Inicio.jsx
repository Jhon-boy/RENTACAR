import '../client/styles/Home.css'
import NavBar from './NavBar';
import { CardAuto } from '../client/components/CardAuto'
import { URL } from '../client/data/URL'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Portada from '../client/components/Portada'
import Footer from '../client/components/Footer'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Ventaja from '../client/components/Virtudes'
import ChatFuelScript from './ChatFuelScript';



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
            <div className="main">
                <div className='home-content'>
                    <div className="portada">
                        <Portada />
                    </div>
                    <script id="64a42eb3dbb08e674f8c0d37" src="https://dashboard.chatfuel.com/integration/entry-point.js" async defer></script>
                    <div className="autos">
                        <h2 className="title-cars">AUTOS MODERNOS</h2>
                        <p className='frase'>¿Cuál auto le interesa? En nuestros autos de renta podemos ayudarle a elegir. Revise cuales son nuestros vehiculos más populares.</p>
                        <div className="cards-autos">
                            <Grid className='container-autos' container spacing={2}>
                                {autos.map(auto => (
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
                    </div>
                    <div className="ventajas">
                        <Ventaja />
                    </div>
                    <div className="footer">
                        <Footer />
                    </div>
                </div >
            </div>
        </div>
    );
};

