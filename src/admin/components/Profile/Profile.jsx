/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../../Home.css';
import Swal from 'sweetalert2';
import { URL } from '../../data/URL';
import { ActualizarAdmin } from '../../database/Admin.controller';
import { validarCorreo, validarContrasena, contrasenasValidadas } from './controllerCorreo';

export const Profile = (props) => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [editable, setEditable] = useState(false);
    const [estado, setEstado] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [admin, setAdmin] = useState({ correo: '', contrasena: '', estado: '' });

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
        admin.correo = correo;
        admin.contrasena = confirmarContrasena;
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
                        'Actualizado!',
                        'Tus credenciales han sido actualizados.',
                        'success'
                    )
                    setEditable(false);
                    setNuevaContrasena('');
                    setConfirmarContrasena('');
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
                <div className='EditPerfil' style={{ marginLeft: '155px' }}>
                    <h2>Credenciales del Administrador</h2>
                    <div>
                        <TextField
                            label="Correo" handleCorreoChange
                            value={correo}
                            onChange={(e) => {
                                const correoAux = e.target.value;
                                setCorreo(e.target.value);
                                setcorreoValido(validarCorreo(correoAux))
                            }}
                            disabled={!editable}
                            required
                            fullWidth
                        />
                        {!correoValido && (
                            <div>
                                <h6 className="ErroresInput2">*Formato invalido</h6>
                            </div>
                        )}
                    </div>

                    {!editable ? (
                        <div>
                            <TextField
                                label="Contraseña"
                                type={mostrarContrasena ? 'text' : 'password'}
                                value="********" // Muestra asteriscos en lugar de la contraseña actual
                                disabled
                                fullWidth
                            />
                        </div>
                    ) : (
                        <>
                            <div>
                                <TextField
                                    label="Contraseña actual"
                                    type={mostrarContrasena ? 'text' : 'password'}
                                    value={contrasena}
                                    onChange={handleContrasenaChange}
                                    disabled
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
                            <div>
                                <TextField
                                    label="Nueva contraseña"
                                    type={mostrarContrasena ? 'text' : 'password'}
                                    value={nuevaContrasena}
                                    onChange={(e) => {
                                        const contraAux = e.target.value;
                                        setNuevaContrasena(e.target.value);
                                        setnuevaContrasenaValida(validarContrasena(contraAux))
                                    }}
                                    fullWidth
                                />
                                {!nuevaContrasenaValida && (
                                    <div>
                                        <h6 className="ErroresInput2">*Formato invalido [Password_2231]</h6>
                                    </div>
                                )}
                            </div>
                            <div>
                                <TextField
                                    label="Confirmar contraseña"
                                    type={mostrarContrasena ? 'text' : 'password'}
                                    value={confirmarContrasena}
                                    onChange={(e) => {
                                        const contraAux2 = e.target.value;
                                        setConfirmarContrasena(e.target.value);
                                        setconfirmarContrasenaValida(contrasenasValidadas(contraAux2, nuevaContrasena))
                                    }}
                                    fullWidth
                                />
                                {!confirmarContrasenaValida && (
                                    <div>
                                        <h6 className="ErroresInput2">Las contreñas deben coincidir</h6>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <div className='btnEdit'>
                        {editable ? (
                            <>
                                <Button
                                    variant="contained"
                                    className='btns'
                                    onClick={handleGuardarClick}
                                    disabled={!correoValido || !nuevaContrasenaValida || !confirmarContrasenaValida}
                                >
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
