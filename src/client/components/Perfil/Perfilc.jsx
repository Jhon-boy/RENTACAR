/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { URL } from '../../data/URL.js';
import { ActualizarCredencial } from '../../controllers/User.controller.js';
import '../../styles/Perfil.css'

export const Perfilc = (props) => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState(' ');
    const [nuevContrasena, setNuevContrasena] = useState('')
    const [editable, setEditable] = useState(false);
    const [estado, setEstado] = useState(' ');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [user, setuser] = useState({ correo: '', contrasena: '', estado: '' });
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
        user.correo = correo;
        user.contrasena = contrasena;
        user.estado = estado;
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
                    await ActualizarCredencial(props.id, user);
                    Swal.fire(
                        'Editado',
                        'Tus credenciales han sido editados.',
                        'success'
                    )
                    setNuevContrasena('');
                } catch (error) {
                    console.error(error);
                    Swal.fire(
                        'Error',
                        'Ocurrió un error al actualizar los datos',
                        'error'
                    );
                    setuser('');

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
        <div>
            <div className='EditPerfil'>
                <div className='inputs'>
                    <div className='dividers'>
                        <TextField
                            label='Correo'
                            value={correo}
                            onChange={handleCorreoChange}
                            disabled={!editable}
                            style={{height: '20px' , marginTop: '-12%'}}
                        />
                    </div>

                    <div className='dividers'>
                        <TextField
                            label='Contraseña'
                            type={mostrarContrasena ? 'text' : 'password'}
                            value={contrasena}
                            onChange={handleContrasenaChange}
                            disabled={!editable}
                            style={{height: '20px' , width: '230px', marginTop: '-12%'}}
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
                </div>

                <div>
                    {
                        editable ? (
                            <>
                                <div className='inputs'>
                                    <div className='dividers'>
                                        <TextField
                                            label="Nueva Contraseña"
                                            type={mostrarContrasena ? 'text' : 'password'}
                                            value={nuevContrasena}
                                            onChange={handleContrasenaChange}
                                            disabled={!editable}
                                            style={{height: '20px' , width: '230px', marginTop: '-2%'}}
                                        />
                                    </div>
                                    <div className='dividers'>
                                        <TextField
                                            label="Confirme la contraseña"
                                            type={mostrarContrasena ? 'text' : 'password'}
                                            value={nuevContrasena}
                                            onChange={handleContrasenaChange}
                                            disabled={!editable}
                                            style={{height: '20px' , width: '230px', marginTop: '-2%'}}
                                        />
                                    </div>

                                </div>

                            </>

                        ) : (
                            <p> </p>
                        )
                    }


                </div>
                <div className='btnEdit'>
                    {editable ? (
                        <>
                            <Button variant="contained" className='btns' style={{ marginTop: '50px' }}  onClick={handleGuardarClick}>
                                Guardar
                            </Button>
                            <Button variant="outlined" className='btns' style={{ marginTop: '50px' }}  color="error" onClick={() => setEditable(false)}>
                                Cancelar
                            </Button>
                        </>

                    ) : (
                        <Button variant="contained" style={{ marginLeft: '22%', marginTop: '50px' }} onClick={handleEditarClick}>
                            Editar
                        </Button>
                    )}

                </div>
            </div>
        </div>
    )
}

