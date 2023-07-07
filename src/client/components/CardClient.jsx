/* eslint-disable react/prop-types */
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { URL } from '../data/URL';
import { Estado } from './Estado';
import { Done, Clear } from '@mui/icons-material/';
import ListItemIcon from '@mui/material/ListItemIcon';

export const CardClient = ({ cliente }) => {

    const [licencia, setLicencia] = useState('');

    useEffect(() => {
        const obtenerLicencia = async () => {
            try {
                const response = await fetch(`${URL}/licencia/${cliente.id_licencia}`); // Reemplaza "tu_url_de_api" con la URL correcta de tu API y "123" con el id de la licencia que deseas obtener
                const data = await response.json();
                setLicencia(data); // Guarda la respuesta en el estado "licencia"
            } catch (error) {
                console.error('Error al obtener la licencia:', error);
            }
        };

        obtenerLicencia();
    }, [cliente]);

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
            }}
        >
            <ListItem>
                <Estado estado={cliente.estado} />

                <ListItemText primary={cliente.estado} secondary="Tu cuenta" />
            </ListItem>
            <Divider component="li" />
            <li>
                <Typography
                    sx={{ mt: 0.5, ml: 2 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                >
                    Tu licencia
                </Typography>
            </li>
            <ListItem>
                <ListItem>
                    <ListItemIcon>
                        {licencia.estado ? <Done color="primary" /> : <Clear color="error" />}
                    </ListItemIcon>
                    <ListItemText primary={licencia.categoria} secondary="Categoria" />
                </ListItem>
            </ListItem>
            <Divider component="li" variant="inset" />
            <li>
                <Typography
                    sx={{ mt: 0.5, ml: 9 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                >
                    Tu información
                </Typography>
            </li>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BeachAccessIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={cliente.nombre} secondary="Tu nombre" />
            </ListItem>
        </List>
    )
}
