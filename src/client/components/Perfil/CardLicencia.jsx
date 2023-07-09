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

export const CardLicencia = (props) => {
    const [licenciaData, setlicenciaData] = useState([]);
    const [editableC, setEditableC] = useState(false);
    const [fotoPreview, setFotoPreview] = useState(null);

    const handlelicenciaInputChange = (event) => {
        const { name, value } = event.target;
        setlicenciaData((prevClienteData) => ({
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

    const handleEditarlicenciaClick = () => {
        setEditableC(true);
    };

    const handleGuardarCambiosClick = () => {
        setEditableC(false);
        // Aquí puedes realizar alguna acción para guardar los cambios en el licencia
    };
    useEffect(() => {
        const fetchConfigL = async () => {
            try {
                const response = await fetch(`${URL}/licencia/${props.id_licencia}`);
                const data = await response.json();
                setlicenciaData(data);
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
                            src={fotoPreview ? fotoPreview : `${IMAGE}/${licenciaData.fotolicencia}`}
                            alt={`${licenciaData.id_licencia} ${licenciaData.categoria}`}
                            sx={{ width: 300, height: 190, marginLeft: 1 }}
                        />
                        {editableC && (
                            <FormControl fullWidth>
                                <input type="file" accept="image/*" onChange={handleFotoInputChange} />
                            </FormControl>
                        )}
                    </Grid>
                </div>

                <Grid style={{ marginLeft: '10px' }}>
                    <div className='inputs'>
                        <TextField
                            name="id_licencia"
                            label='Licencia'
                            value={licenciaData.id_licencia}
                            onChange={handlelicenciaInputChange}
                            disabled={!editableC}
                            style={{ height: '20px', width: '230px', marginTop: '-4%' }}
                        />
                        <FormControl component="fieldset"
                            style={{ height: '20px', width: '230px', marginTop: '-4%', marginLeft: '20px' }}>
                            <Select
                                label='Categoría'
                                name="categoria"
                                value={licenciaData.categoria}
                                onChange={handlelicenciaInputChange}
                                disabled={!editableC}
                            >
                                <MenuItem value="A">A</MenuItem>
                                <MenuItem value="B">B</MenuItem>
                                <MenuItem value="C">C</MenuItem>
                                <MenuItem value="D">D</MenuItem>
                                <MenuItem value="E">E</MenuItem>
                                <MenuItem value="E1">E1</MenuItem>
                            </Select>
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
                        <Button style={{ marginLeft: '110%'}}  variant="contained" onClick={handleEditarlicenciaClick}>
                            Editar
                        </Button>
                    )}
                </div>
            </Grid>
        </div>
    )
}
