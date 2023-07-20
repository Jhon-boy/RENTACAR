import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import  {URL } from '../data/URL'
import { useEffect } from 'react';
import { useState } from 'react';

export const OverviewTotalCustomers = (props) => {
  const [usuarios, setUsuarios] = useState(0);
  const { difference = 15, positive = true } = props;
  
  useEffect(() => {
    const cargarCliente = async () => {
      try {
        const responseClientes = await fetch(`${URL}/user`);
        const clientesData = await responseClientes.json();
        
        // Filtrar usuarios con estado 'CONECTADO'
        const usuariosConectados = clientesData.filter((usuario) => usuario.estado === 'CONECTADO');
        
        // Guardar el número de usuarios conectados en el estado setUsuarios
        setUsuarios(usuariosConectados.length);
        
      } catch (error) {
        console.error(error);
      }
    };
    
    cargarCliente();
  }, []);
  
  return (
    <Card sx={{ maxHeight: 170 }}>
      <CardContent>
        <Stack
             alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={0}>
            <Typography
              color="text.secondary"
              variant="p"
            >
             Usuarios Conectados
            </Typography>
            <Typography  variant="h2"   >
              {usuarios}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={4}
            sx={{ mt: 4 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.4}
            >
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Ultimo mes
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewTotalCustomers.propTypes = {
  difference: PropTypes.number,
  positive: true,
  value: PropTypes.string.isRequired,
};

