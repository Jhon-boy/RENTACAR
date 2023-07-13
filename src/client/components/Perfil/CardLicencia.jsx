/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TextField, Button, } from '@mui/material';
import { IMAGE } from '../../data/URL.js';
import { URL } from '../../data/URL.js';
import '../../styles/Perfil.css'
import {
    FormControl,
    Grid,
    CardMedia, Select, MenuItem
} from '@mui/material';
import Swal from 'sweetalert2';

import { CheckCircle, Block } from '@mui/icons-material/';
import { verificarLicencias, verificarFechas } from '../../controllers/cliente.controller.js';
import { editarLicencia } from '../../controllers/controllerCliente.js';

export const CardLicencia = (props) => {
    const [licenciaData, setlicenciaData] = useState([]);
    const [editableC, setEditableC] = useState(false);
    const [fotoPreview, setFotoPreview] = useState(null);

    //ALMACANAMIENTO
    // eslint-disable-next-line no-unused-vars
    const [categoria, setCategoria] = useState();
    const [fecha_Caducidad, setFecha_Caducidad] = useState('');
    const [licencia, setLicencia] = useState('');
    const [foto, setFoto] = useState(licenciaData.fotolicencia);

    //validaciones 
    const [fechaValida, setFechaCaducidadValida ]= useState(true);
    const [ licenciaValida, setLicenciaValida ] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [imageFile, setImageFile] = useState(null);

    const fechaCaducidad = new Date(fecha_Caducidad);
    const fechaCaducidadISO = isNaN(fechaCaducidad) ? '' : fechaCaducidad.toISOString().split('T')[0];

    const handleEditarlicenciaClick = () => {
        setEditableC(true);
    };

    const handleGuardarCambiosClick = async () => {
        setEditableC(false);
      
        const formData = new FormData();
        formData.append('id', licencia);
        formData.append('fecha_caducidad', fecha_Caducidad);
        formData.append('categoria', categoria);
        formData.append('estado', licenciaData.estado);

        if (foto instanceof File) {
            formData.append('fotolicencia', foto);
        }
        try {
            await editarLicencia(licencia, formData);
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
        // Aquí puedes realizar alguna acción para guardar los cambios en el licencia
    };


    useEffect(() => {
        const fetchConfigL = async () => {
            try {
                const response = await fetch(`${URL}/licencia/${props.id_licencia}`);
                const data = await response.json();
                setlicenciaData(data);
                setCategoria(data.categoria);
                setFecha_Caducidad(data.fecha_caducidad);
                setLicencia(data.id_licencia);
                setFoto(data.fotolicencia);
            } catch (error) {
                console.log(error);
            }
        };
        fetchConfigL();
    }, [props.id_licencia]);

    return (
        <div className='EditInfo'>
            <Grid container spacing={0} alignItems="center">
                <div>
                    <Grid>
                        <CardMedia
                            component="img"
                            height="144"
                            src={fotoPreview ? fotoPreview : `${IMAGE}/${foto}`}
                            alt={`${licenciaData.id_licencia} ${licenciaData.categoria}`}
                            sx={{ width: 300, height: 190, marginLeft: 1 }}
                        />

                        <p style={{ marginLeft: '30px', fontSize: '16px' }}>Estado:    {licenciaData.estado ? <CheckCircle style={{ color: 'green' }} /> : <Block style={{ color: 'red' }} />}</p>
                        {editableC && (
                            <FormControl fullWidth>
                                <input type="file" accept="image/*"
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

                                            }}  />
                            </FormControl>
                        )}
                    </Grid>
                </div>

                <Grid style={{ marginLeft: '10px' }}>
                    <div className='inputs'>

                        <TextField
                            label="Licencia"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="Licencia"
                            value={licencia}
                          
                            style={{ height: '20px', width: '230px', marginTop: '-4%' }}
                            onChange={(e) =>{
                                const licenciaAux = e.target.value;
                                setLicencia(e.target.value)
                                setLicenciaValida(verificarLicencias(licenciaAux))
                            }}
                             disabled={!editableC}
                        />
                          {!licenciaValida && (
                                <div>
                                    <h6 className="ErroresInput5">*Licencia incorrecta. Debe contener 10 diguitos validos</h6>
                                </div>
                            )}
                        <FormControl component="fieldset"
                            style={{ height: '20px', width: '230px', marginTop: '-4%', marginLeft: '20px' }}>
                            <Select
                                name="categoria"
                                value={categoria}
                                onChange={(e) =>{
                                    setCategoria(e.target.value);
                                }}
                                disabled={!editableC}
                            >
                                <MenuItem value="B ">B</MenuItem>
                                <MenuItem value="C ">C</MenuItem>
                                <MenuItem value="D ">D</MenuItem>
                                <MenuItem value="E ">E</MenuItem>
                                <MenuItem value="E1 ">E1</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ marginTop: '60px' }} >
                        <FormControl>
                            <TextField
                                label="fecha de Caducidad"
                                type="date"
                                name="fechaCaducidad"
                                value={fechaCaducidadISO}
                                disabled={!editableC}
                                onChange={(e) =>{
                                const fechaAux = e.target.value;
                                setFecha_Caducidad(e.target.value)
                                setFechaCaducidadValida(verificarFechas(fechaAux))
                            }}
                            /></FormControl>
                             {!fechaValida && (
                                <div>
                                    <h6 className="ErroresInput5">*La fecha debe ser valida</h6>
                                </div>
                            )}
                    </div>

                </Grid>
                <div className='btnEdit'>
                    {editableC ? (
                        <>
                            <Button variant="contained" 
                            onClick={handleGuardarCambiosClick}
                            disabled={!fechaValida  || !licenciaValida}
                            >
                                Guardar
                            </Button>
                            <Button variant="outlined" className='btns' color="error" onClick={() => setEditableC(false)}>
                                Cancelar
                            </Button>
                        </>


                    ) : (
                        <Button style={{ marginLeft: '110%' }} variant="contained" onClick={handleEditarlicenciaClick}>
                            Editar
                        </Button>
                    )}
                </div>
            </Grid>
        </div>
    )
}
