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
import { Estado } from './Estado.jsx';

export const InfoC = (props) => {

    const [clienteData, setClienteData] = useState(props.cliente);
    const [editableC, setEditableC] = useState(false);
    const [fotoPreview, setFotoPreview] = useState(null);


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


    return (
        <div>
            <div className='EditInfo'>
                <Grid container spacing={0} alignItems="center">
                    <div>
                        <Grid >
                            <CardMedia
                                component="img"
                                height="144"
                                src={fotoPreview ? fotoPreview : `${IMAGE}/${clienteData.foto}`}
                                alt={`${clienteData.nombre} ${clienteData.apellido}`}
                                sx={{ width: 300, height: 190, marginLeft: 1 }}
                            />
                            {editableC && (
                                <FormControl fullWidth>
                                    <input type="file" accept="image/*" onChange={handleFotoInputChange} />
                                </FormControl>
                            )}
                        </Grid>
                        <div style={{ marginLeft: '20px', display: 'flex ' }}>
                            Estado:     <Estado estado={clienteData.estado} />
                        </div>

                    </div>

                    <Grid style={{ marginLeft: '20px' }}>
                        <div className='inputs'>
                            <TextField
                                label="Nombre"
                                name="nombre"
                                value={clienteData.nombre}
                                onChange={handleClienteInputChange}
                                disabled={!editableC}
                                style={{ height: '20px', width: '230px', marginTop: '-12%' }}
                            />
                            <TextField
                                label="Apellido"
                                name="apellido"
                                value={clienteData.apellido}
                                onChange={handleClienteInputChange}
                                disabled={!editableC}
                                style={{ height: '20px', width: '230px', marginTop: '-12%', marginLeft: '20px' }}
                            />
                        </div>
                        <div className='inputs'>
                            <TextField
                                label="Cédula"
                                name="cedula"
                                value={clienteData.cedula}
                                onChange={handleClienteInputChange}
                                disabled={!editableC}
                                style={{ height: '20px', width: '230px', marginTop: '5%' }}
                            />
                            <FormControl component="fieldset"
                                style={{ height: '20px', width: '230px', marginTop: '5%' , marginLeft: '20px' }}
                            >
                                <FormLabel component="legend">Género</FormLabel>
                                <RadioGroup
                                    name="genero"
                                    value={clienteData.genero}
                                    onChange={handleClienteInputChange}
                                    disabled={!editableC}
                                >
                                    <FormControlLabel value="MASCULINO" control={<Radio />} label="Masculino" />
                                    <FormControlLabel value="FEMENINO" control={<Radio />} label="Femenino" />
                                </RadioGroup>
                            </FormControl>
                        </div>


                    </Grid>
                    <div className='btnEdit'>
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
                                <Button style={{ marginLeft: '110%'}}  variant="contained" onClick={handleEditarClienteClick}>
                                    Editar
                                </Button>
                            )}
                        </div>
                </Grid>

            </div>

        </div>
    )
}
