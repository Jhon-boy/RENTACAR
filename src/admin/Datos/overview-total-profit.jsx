import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { URL } from '../data/URL'
import { useEffect } from 'react';
import { useState } from 'react';

export const OverviewTotalProfit = (props) => {
  const [totalPago, setTotalPago] = useState(0);
  const { value = totalPago, sx } = props;


  useEffect(() => {
    const cargarPagos = async () => {
      try {
        const responsePagos = await fetch(`${URL}/pagos`);
        const pagosData = await responsePagos.json();

        // Calcular el monto total de los pagos en dinero
        const totalPago = pagosData.reduce((total, pago) => total + parseFloat(pago.monto), 0);

        // Redondear el monto total a 2 cifras decimales
        const totalPagoRedondeado = totalPago.toFixed(0);

        // Guardar el monto total redondeado en el estado setTotalPago
        setTotalPago(totalPagoRedondeado);

      } catch (error) {
        console.error(error);
      }
    };

    cargarPagos();
  }, []);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Ingreso Total
            </Typography>
            <Typography variant="h2">
              {value}K
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Año 2023
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};


OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
