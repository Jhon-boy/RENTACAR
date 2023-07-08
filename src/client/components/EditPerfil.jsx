/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { URL } from '../data/URL.js';
import { ActualizarCredencial } from '../controllers/User.controller.js';
import { IMAGE } from '../data/URL.js';
import '../styles/Perfil.css'
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    CardMedia,
    Divider, Chip
} from '@mui/material';

export const EditPerfil = (props) => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState(' ');
    const [editable, setEditable] = useState(false);
    const [estado, setEstado] = useState(' ');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [user, setuser] = useState({ correo: '', contrasena: '', estado: '' });
    const [clienteData, setClienteData] = useState(props.cliente);
    const [editableC, setEditableC] = useState(false);
    const [fotoPreview, setFotoPreview] = useState(null);

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
    const handleClienteInputChange = (event) => {
        const { name, value } = event.target;
        setClienteData((prevClienteData) => ({
            ...prevClienteData,
            [name]: value,
        }));
    };

    const handleFotoInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleEditarClienteClick = () => {
        setEditableC(true);
    };

    const handleGuardarCambiosClick = () => {
        setEditableC(false);
        // Aquí puedes realizar alguna acción para guardar los cambios en el cliente
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
        <div className='Perfil-Container'>
            <div className="client-container">
                <div className='EditPerfil'>
                    <Divider textAlign="left">
                        <Chip label="Tu credenciales" color="primary" />
                    </Divider>
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
            <div className='EditUser'>
                <Divider textAlign="left" >
                    <Chip label="Tu informacion Personal" color="primary" />
                </Divider>
                <Box p={1}>
                    <Grid container spacing={1} alignItems="">
                        <Grid item xs={12} md={8} lg={5}>
                        <Grid item xs={1} md={0} lg={3}>
                                <CardMedia
                                    component="img"
                                    height="144"
                                    src={`${IMAGE}/${clienteData.foto}`}
                                    alt={`${clienteData.nombre} ${clienteData.apellido}`}
                                    sx={{ width: 300, height: 190, marginLeft: 1 }}
                                />
                                {editableC && (
                                    <FormControl fullWidth>
                                        <input type="file" accept="image/*" onChange={handleFotoInputChange} />
                                    </FormControl>
                                )}
                            </Grid>
                            <TextField
                                label="Nombre"
                                name="nombre"
                                value={clienteData.nombre}
                                onChange={handleClienteInputChange}
                                disabled={!editableC}
                                fullWidth
                            />
                            <TextField
                                label="Apellido"
                                name="apellido"
                                value={clienteData.apellido}
                                onChange={handleClienteInputChange}
                                disabled={!editableC}
                                fullWidth
                            />
                            <TextField
                                label="Cédula"
                                name="cedula"
                                value={clienteData.cedula}
                                onChange={handleClienteInputChange}
                                disabled={!editableC}
                                fullWidth
                            />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Género</FormLabel>
                                <RadioGroup
                                    name="genero"
                                    value={clienteData.genero}
                                    onChange={handleClienteInputChange}
                                    disabled={!editableC}
                                    row
                                >
                                    <FormControlLabel value="MASCULINO" control={<Radio />} label="Masculino" />
                                    <FormControlLabel value="FEMENINO" control={<Radio />} label="Femenino" />
                                </RadioGroup>
                            </FormControl>

                            {editableC ? (
                                <>
                                    <Button variant="contained" onClick={handleGuardarCambiosClick}>
                                        Guardar
                                    </Button>
                                    <Button variant="outlined" className='btns' color="error" onClick={() => setEditableC(false)}>
                                        Cancelar
                                    </Button>
                                </>


                            ) : (
                                <Button variant="contained" onClick={handleEditarClienteClick}>
                                    Editar
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
}
