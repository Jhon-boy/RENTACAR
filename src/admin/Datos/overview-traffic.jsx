
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  useTheme
} from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { URL } from '../data/URL'
import { useEffect } from 'react';
import { useState } from 'react';



ChartJS.register(ArcElement, Tooltip, Legend);



const useChartOptions = (labels) => {

  const theme = useTheme();

  return {
    chart: {
      background: 'transparent'
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main
    ],
    dataLabels: {
      enabled: false
    },
    labels,
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fillSeriesColor: false
    }
  };
};


export const OverviewTraffic = () => {
  const [paypal, setPaylpal] = useState(0);
  const [fisico, setFisico] = useState(0);
  const [otros, setOtros] = useState(0);
  const [transferencia, setTranferencia] = useState(0);

  useEffect(() => {
    const cargarPagos = async () => {
      try {
        const responsePagos = await fetch(`${URL}/pagos`);
        const pagosData = await responsePagos.json();

        // Contadores para cada tipo de pago
        let countPaypal = 0;
        let countFisico = 0;
        let countOtros = 0;
        let countTransferencia = 0;

        // Iterar sobre los pagos y contar según el método de pago
        pagosData.forEach((pago) => {
          if (pago.tipo === "PAYPAL") {
            countPaypal++;
          } else if (pago.tipo === "FISICO") {
            countFisico++;
          } else if (pago.tipo === "OTRO") {
            countOtros++;
          } else if (pago.tipo === "TRANSFERENCIA") {
            countTransferencia++;
          }
        });

        // Actualizar los estados con los valores enteros obtenidos
        setPaylpal(countPaypal);
        setFisico(countFisico);
        setOtros(countOtros);
        setTranferencia(countTransferencia);
        console.log('PAYPAL: ' + paypal + '  - FISICO:  ' + fisico + '  - otro: ' + otros + ' TRANSFERENCIA: ' + transferencia)

      } catch (error) {
        console.error(error);
      }
    };
    cargarPagos();
  }, []);
  const dataActualizado = {
    labels: ['Paypal', 'Fisico', 'Transferencia', 'Otros'],
    datasets: [
      {
        data: [paypal, fisico, transferencia, otros],
        backgroundColor: [
          'rgb(0, 112, 186)',
          'rgb(0, 163, 0)',
          'purple',
          'pink'
        ],
        borderColor: ['white', 'white', 'white', 'white'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card sx={{ height: '430px', width: '330px' }}>
      <CardHeader title="Tipo de pagos mas usados" />
      <CardContent>
        <div height={350} >
        <Pie data={dataActualizado} />

        </div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={0}
          sx={{ mt: 2 }}

        >
        </Stack>
      </CardContent>
    </Card>
  );
};
