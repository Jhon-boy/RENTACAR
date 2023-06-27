import { useEffect, useState } from 'react';
import UserCard from './useCard';
import { URL } from '../data/URL';
import axios from 'axios';
import '../Home.css';
import Grid from '@mui/material/Grid';
import { SliderBar } from './SliderBar';

export const CardClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [licencias, setLicencias] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    // eslint-disable-next-line no-unused-vars
    const [datosCombinados, setDatosCombinados] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get(`${URL}/clientes`);
                setClientes(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchLicencias = async () => {
            try {
                const response = await axios.get(`${URL}/licencia`);
                setLicencias(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClientes();
        fetchLicencias();
    }, []);

    useEffect(() => {
        const combinarDatos = () => {
            const datosCombinados = clientes.map(cliente => {
                const licenciaCorrespondiente = licencias.find(licencia => licencia.id_licencia === cliente.id_licencia);
                return {
                    ...cliente,
                    licencia: licenciaCorrespondiente
                };
            });
            setDatosCombinados(datosCombinados);
        };

        combinarDatos();
    }, [clientes, licencias]);

    return (
        <div className='page-content'>
            <div className='home-client'>
            <span>Hola</span>
                <SliderBar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

                <Grid container spacing={-20}>
                    {datosCombinados.map((cliente) => (
                        <Grid item xs={12} sm={3} md={4} key={cliente.id_cliente}>
                            <UserCard cliente={cliente} />
                        </Grid>
                    ))}
                </Grid>
            </div>

    );
};
