/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { IMAGE } from '../../data/URL.js';
import '../../styles/Perfil.css'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    CardMedia,
} from '@mui/material';
import Form from 'react-bootstrap/Form';

import { Estado } from './Estado.jsx';
import { verificarCedula, verificarNombre } from '../../controllers/cliente.controller.js';
import Swal from 'sweetalert2';
import { editarCliente } from '../../controllers/controllerCliente.js';

export const InfoC = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [clienteData, setClienteData] = useState(props.cliente);
    const [editableC, setEditableC] = useState(false);
    const [fotoPreview, setFotoPreview] = useState(null);

    //ALMACENADO EN ESTADOS: _______-
    const [cedula, setCedula] = useState(clienteData.cedula);
    const [nombre, setNombre] = useState(clienteData.nombre);
    const [apellido, setApellido] = useState(clienteData.apellido);
    const [genero, setGenero] = useState(clienteData.genero);
    const [foto, setFoto] = useState(clienteData.foto);
    const [estado, setEstado] = useState('');
    // VALIDARCIONEES
    const [cedulaValido, setCedulaValido] = useState(clienteData.cedula);
    const [nombreValido, setNombreValido] = useState(clienteData.nombre);
    const [apellidoValido, setApellidoValido] = useState(clienteData.apellido);
    // eslint-disable-next-line no-unused-vars
    const [imageFile, setImageFile] = useState(null);

    const handleEditarClienteClick = () => {
        setEditableC(true);
    };

    const handleGuardarCambiosClick = async () => {
        setEstado(clienteData.estado);

        if (nombre === '' || apellido === '' || cedula === '' || genero === '') {

            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos ',
                text: 'Por favor, completa todos los campos antes de registrar el auto.',
            });
            return;
        }
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('cedula', cedula);
        formData.append('genero', genero);
        formData.append('estado', estado);
        if (foto instanceof File) {
            formData.append('foto', foto);
        }
        try {
            await editarCliente(clienteData.id_cliente, formData);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Su información ha sido actualizado',
                showConfirmButton: false,
                timer: 1500
            })
            setEditableC(false);

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo Salio mal',
                text: 'Error: ' + error.message,
            });
        }
        // Aquí puedes realizar alguna acción para guardar los cambios en el cliente
    };


    return (
        <div>
            <div className='EditInfo'>
                <Form onSubmit={handleGuardarCambiosClick} encType='multipart/form-data' >
                    <Grid container spacing={0} alignItems="center">
                        <div>
                            <Grid >
                                <CardMedia
                                    component="img"
                                    height="144"
                                    src={fotoPreview ? fotoPreview : `${IMAGE}/${foto}`}
                                    alt={`${nombre} ${apellido}`}
                                    sx={{ width: 300, height: 190 }}
                                />
                                {editableC && (
                                    <FormControl fullWidth>
                                        <input
                                            required
                                            type="file" accept="image/*"
                                            classNamename="foto"
                                            onChange={(e) => {
                                                const archivo = e.target.files[0];
                                                setFoto(e.target.files[0]);
                                                const file = e.target.files[0];
                                                const reader = new FileReader();

                                                reader.onloadend = () => {
                                                    setFotoPreview(reader.result);
                                                };
                                                reader.readAsDataURL(archivo);
                                                if (file) {
                                                    reader.readAsDataURL(file);
                                                    setImageFile(file);
                                                }
                                            }} />
                                    </FormControl>
                                )}
                            </Grid>
                            <div style={{ marginLeft: '9%', display: 'flex ', marginTop: '15px' }}>
                                Estado:     <Estado estado={clienteData.estado} />
                            </div>
                        </div>

                        <Grid style={{ marginLeft: '20px' }}>
                            <div className='inputs'>
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    value={nombre}
                                    onChange={(e) => {
                                        const nombreAux = e.target.value;
                                        setNombre(e.target.value)
                                        setNombreValido(verificarNombre(nombreAux))
                                    }}
                                    disabled={!editableC}
                                    style={{ height: '20px', width: '230px', marginTop: '-12%' }}
                                />
                                <TextField
                                    label="Apellido"
                                    name="apellido"
                                    value={apellido}
                                    onChange={(e) => {
                                        const apellidoAux = e.target.value;
                                        setApellido(e.target.value)
                                        setApellidoValido(verificarNombre(apellidoAux))
                                    }}
                                    disabled={!editableC}
                                    style={{ height: '20px', width: '230px', marginTop: '-12%', marginLeft: '20px' }}
                                />
                                {!apellidoValido && (
                                    <div>
                                        <h6 className="ErroresInput4">*El apellido deben tener al menos 3 letras sin simbolos</h6>
                                    </div>
                                )}
                            </div>
                            {!nombreValido && (
                                <div>
                                    <h6 className="ErroresInput3">*El nombre debe tener al menos 3 letras sin simbolos</h6>
                                </div>
                            )}

                            <div className='inputs'>
                                <TextField
                                    label="Cédula"
                                    name="cedula"
                                    value={cedula}
                                    onChange={(e) => {
                                        const cedulaAux = e.target.value;
                                        setCedula(e.target.value)
                                        setCedulaValido(verificarCedula(cedulaAux));
                                    }}
                                    disabled={!editableC}
                                    style={{ height: '20px', width: '230px', marginTop: '5%' }}
                                />

                                <FormControl component="fieldset"
                                    style={{ height: '20px', width: '230px', marginTop: '5%', marginLeft: '20px' }}
                                >
                                    <FormLabel component="legend">Género</FormLabel>
                                    <RadioGroup
                                        name="genero"
                                        value={genero}
                                        onChange={(e) => setGenero(e.target.value)}
                                        disabled={!editableC}
                                    >
                                        <FormControlLabel value="MASCULINO" control={<Radio />} label="Masculino" />
                                        <FormControlLabel value="FEMENINO" control={<Radio />} label="Femenino" />
                                    </RadioGroup>

                                </FormControl>
                            </div>
                            {!cedulaValido && (
                                <div>
                                    <h6 className="ErroresInput5">*Cedula incorrecta. Debe contener 10 diguitos</h6>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                    <div className='btnEdit'>
                        {editableC ? (
                            <>
                                <Button variant="contained"
                                    style={{ marginTop: '25px', marginLeft: '3%' }}
                                    onClick={handleGuardarCambiosClick}
                                    disabled={!nombreValido || !apellidoValido || !cedulaValido}
                                >
                                    Guardar
                                </Button>
                                <Button
                                    style={{ marginTop: '25px', marginLeft: '2%' }}
                                    variant="outlined" className='btns' color="error" onClick={() => setEditableC(false)}>
                                    Cancelar
                                </Button>
                            </>

                        ) : (
                            <Button style={{ marginLeft: '3%', marginTop: '10px' }} variant="contained" onClick={handleEditarClienteClick}>
                                Editar
                            </Button>
                        )}
                    </div>
                </Form>
            </div>
        </div>
    )
}
