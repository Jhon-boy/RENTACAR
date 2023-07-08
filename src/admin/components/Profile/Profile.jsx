/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../../Home.css';
import Swal from 'sweetalert2';
import { URL } from '../../data/URL';
import { ActualizarAdmin } from '../../database/Admin.controller';

export const Profile = (props) => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState(' ');
    const [editable, setEditable] = useState(false);
    const [estado, setEstado] = useState(' ');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [admin, setAdmin] = useState({ correo: '', contrasena: '', estado: '' });

    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    };

    const handleContrasenaChange = (event) => {
        setContrasena(event.target.value);
    };

    const handleEditarClick = () => {
        setEditable(true);
    };

    const handleGuardarClick = () => {
        admin.correo = correo;
        admin.contrasena= contrasena;
        admin.estado = estado;
        Swal.fire({
            title: 'Estas seguro de esta acción?',
            text: "Estas por actualizar las credenciales de acceso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, actualizar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await ActualizarAdmin(props.id, admin);
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                } catch (error) {
                    console.error(error);
                    Swal.fire(
                        'Error',
                        'Ocurrió un error al actualizar los datos',
                        'error'
                    );
                    setAdmin('');

                }

            }
        })
    };

    const handleMostrarContrasenaClick = () => {
        setMostrarContrasena(!mostrarContrasena);
    };

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch(`${URL}/user/${props.id}`);
                const data = await response.json();
                setCorreo(data.correo);
                setContrasena(data.contrasena);
                setEstado(data.estado);
            } catch (error) {
                console.log(error);
            }
        };
        fetchConfig();
    }, [props.id]);

    return (
        <div className="page-content">
            <div className="home-container">
                <div className='EditPerfil'>
                    <h2>Credenciales del Administrador</h2>
                    <div>
                        <TextField
                            label="Correo"
                            value={correo}
                            onChange={handleCorreoChange}
                            disabled={!editable}
                            fullWidth
                        />
                    </div>

                    <div>
                        <TextField
                            label="Contraseña"
                            type={mostrarContrasena ? 'text' : 'password'}
                            value={contrasena}
                            onChange={handleContrasenaChange}
                            disabled={!editable}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleMostrarContrasenaClick} edge="end">
                                            {mostrarContrasena ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className='btnEdit'>
                        {editable ? (
                            <>
                                <Button variant="contained" className='btns' onClick={handleGuardarClick}>
                                    Guardar
                                </Button>
                                <Button variant="outlined" className='btns' color="error" onClick={() => setEditable(false)}>
                                    Cancelar
                                </Button>
                            </>

                        ) : (
                            <Button variant="contained" style={{ marginLeft: '60px' }} onClick={handleEditarClick}>
                                Editar
                            </Button>
                        )}

                    </div>
                </div>
            </div>
        </div>


    );
};
