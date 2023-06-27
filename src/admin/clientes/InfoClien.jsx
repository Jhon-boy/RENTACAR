
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../Home.css';
import '../styles/Cliente.css'
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import Swal from 'sweetalert2';

import { URL } from '../data/URL';
import { IMAGE } from '../data/URL'
import { editarEstadoClient } from '../database/ClientController';

export const InfoClien = () => {
    const { id } = useParams();
    const [clientes, setClientes] = useState([]);
    const [licencias, setLicencias] = useState([]);
    const [user, setUser] = useState([]);
    const [estado, setEstado] = useState('');

    const editarEstado = async (id, estado2) => {
        setEstado(estado2);
        if (!id || !estado) {
            Swal.fire({
                icon: 'error',
                text: 'Algo Salio Mal.',
            });
            return;
        }
        try {
            await editarEstadoClient(id, estado2);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Valores Incorrectos',
                text: 'ERROR DE TIPO: ' + error.message,
            });
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            let dataLoaded = false;

            while (!dataLoaded) {
                try {
                    const clientesResponse = await axios.get(`${URL}/clientes/${id}`);
                    const licenciasResponse = await axios.get(`${URL}/licencia/${clientesResponse.data.id_licencia}`);
                    const usersResponse = await axios.get(`${URL}/user/${clientesResponse.data.id_usuario}`);

                    setClientes(clientesResponse.data);
                    setLicencias(licenciasResponse.data);
                    setUser(usersResponse.data);

                    dataLoaded = true;
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();

    }, [id]);
    useEffect(() => {
        setEstado(clientes.estado);
    },[clientes.estado])
    
    return (
        <div className="page-content">
            <div className="EditClientP">
                <div className='ConteidoClient'>
                    <div className='ClienteFotos'>
                        <img src={`${IMAGE}/${clientes.foto}`} className="portada2" />
                        <img src={`${IMAGE}/${licencias.fotolicencia}`} className="portada2" />
                    </div>
                    <div className='InfoClient'>
                        <div className='InfoSection'>
                            <div className='ClientInfo'>
                                <label htmlFor='nombre'>Nombre:</label>
                                <input type='text' id='nombre' value={clientes.nombre} readOnly />
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='apellido'>Apellido:</label>
                                <input type='text' id='apellido' value={clientes.apellido} readOnly />
                            </div>
                        </div>
                        <div className='InfoSection'>
                            <div className='ClientInfo'>
                                <label htmlFor='correo'>Correo:</label>
                                <input type='text' id='correo' value={user.correo} readOnly />
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='cedula'>Cédula:</label>
                                <input type='text' id='cedula' value={clientes.cedula} readOnly />
                            </div>
                        </div>
                        <div className='InfoSection'>
                            <div className='ClientInfo'>
                                <label htmlFor='genero'>Género:</label>
                                <input type='text' id='genero' value={clientes.genero} readOnly />
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='estado'>Estado:</label>
                                <input type='text' id='estado' value={estado} readOnly />
                            </div>
                        </div>
                        <Divider />
                        <div className='InfoSection'>
                            <div className='ClientInfo'>
                                <label htmlFor='licencia'>Licencia:</label>
                                <input type='text' id='licencia' value={licencias.id_licencia} readOnly />
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='categoria'>Categoría:</label>
                                <input type='text' id='categoria' value={licencias.categoria} readOnly />
                            </div>
                        </div>

                        <div className='InfoSection'>
                            <div className='ClientInfo'>
                                <label htmlFor='fecha_caducidad'>Fecha de Caducidad:</label>
                                <input type='text' id='fecha_caducidad' value={licencias.fecha_caducidad} readOnly />
                            </div>
                            <div className='ClientInfo'>
                                <label htmlFor='licencia_estado'>Estado:</label>
                                <input type='text' id='licencia_estado' value={licencias.estado} readOnly />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='btnSlider btnClient'>
                        <Stack spacing={10} direction="row">
                            <Button variant="text" onClick={() => editarEstado(id, 'NO HABILITADO')}>DESHABILITAR CUENTA</Button>
                            <Button variant="contained" onClick={() => editarEstado(id, 'HABILITADO')}>HABILITAR CUENTA</Button>
                            <Button variant="outlined" onClick={() => editarEstado(id, 'PENDIENTE')}>MANTENER EN PENDIENTE</Button>
                        </Stack>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
};
