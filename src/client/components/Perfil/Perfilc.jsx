/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { URL } from '../../data/URL.js';
import { ActualizarCredencial } from '../../controllers/User.controller.js';
import '../../styles/Perfil.css'
import { validarCorreo, validarContraseña, contrasenasValidadas } from '../../controllers/cliente.controller.js';

export const Perfilc = (props) => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState(' ');
    const [nuevContrasena, setNuevContrasena] = useState('')
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [editable, setEditable] = useState(false);
    const [estado, setEstado] = useState(' ');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [mostrarNuevaC, setMostrarNuevaC] = useState(false);
    const [user, setuser] = useState({ correo: '', contrasena: '', estado: '' });


    const [correoValido, setcorreoValido] = useState(true);
    const [nuevaContrasenaValida, setnuevaContrasenaValida] = useState(true);
    const [confirmarContrasenaValida, setconfirmarContrasenaValida] = useState(true);

    const handleContrasenaChange = (event) => {
        setContrasena(event.target.value);
    };

    const handleEditarClick = () => {
        setEditable(true);
    };

    const handleGuardarClick = () => {
        user.correo = correo;
        user.contrasena = confirmarContrasena;
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

    const handleMostrarContrasenaClick2 = () => {
        setMostrarNuevaC(!mostrarNuevaC);
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
                            onChange={(e) => {
                                const correoAux = e.target.value;
                                setCorreo(e.target.value);
                                setcorreoValido(validarCorreo(correoAux))
                            }}
                            disabled={!editable}
                            style={{ height: '20px', width: '230px' }}
                        />
                    </div>
                    {!correoValido && (
                        <div>
                            <h6 className="ErroresInput2">*Formato invalido</h6>
                        </div>
                    )}
                    <div className='dividers'>
                        <TextField
                            label='Contraseña'
                            type={mostrarContrasena ? 'text' : 'password'}
                            value={contrasena}
                            onChange={handleContrasenaChange}
                            disabled={!editable}
                            style={{ height: '20px', width: '230px' }}
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
                                            type={mostrarNuevaC ? 'text' : 'password'}
                                            value={nuevContrasena}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleMostrarContrasenaClick2} edge="end">
                                                            {mostrarContrasena ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onChange={(e) => {
                                                const contraAux = e.target.value;
                                                setNuevContrasena(e.target.value);
                                                setnuevaContrasenaValida(validarContraseña(contraAux))
                                            }}
                                            disabled={!editable}
                                            style={{ height: '20px', width: '230px', marginTop: '-2%' }}
                                        />
                                        {!nuevaContrasenaValida && (
                                            <div>
                                                <h6 className="ErroresInput2">*Formato invalido [Password_2231]</h6>
                                            </div>
                                        )}
                                    </div>

                                    <div className='dividers'>
                                        <TextField
                                            label="Confirme la contraseña"
                                            type={'password'}
                                            value={confirmarContrasena}
                                            onChange={(e) => {
                                                const contraAux2 = e.target.value;
                                                setConfirmarContrasena(e.target.value);
                                                setconfirmarContrasenaValida(contrasenasValidadas(contraAux2, nuevContrasena))
                                            }}
                                            disabled={!editable}
                                            style={{ height: '20px', width: '230px', marginTop: '-2%' }}
                                        />
                                        {!confirmarContrasenaValida && (
                                            <div>
                                                <h6 className="ErroresInput2">Las contreñas deben coincidir</h6>
                                            </div>
                                        )}
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
                            <Button variant="contained" className='btns'
                                style={{ marginTop: '25px', marginLeft: '3%' }}
                                onClick={handleGuardarClick}
                                disabled={!correoValido || !nuevaContrasenaValida || !confirmarContrasenaValida}>
                                Guardar
                            </Button>
                            <Button variant="outlined" className='btns' style={{ marginTop: '25px', marginLeft: '2%' }} color="error" onClick={() => setEditable(false)}>
                                Cancelar
                            </Button>
                        </>

                    ) : (
                        <Button variant="contained" style={{ marginLeft: '3%', marginTop: '25px' }} onClick={handleEditarClick}>
                            Editar
                        </Button>
                    )}

                </div>
            </div>
        </div>
    )
}

