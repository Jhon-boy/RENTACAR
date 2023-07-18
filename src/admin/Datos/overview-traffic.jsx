
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  useTheme
} from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Paypal', 'Fisico', 'Transferencia', 'Otros'],
  datasets: [
    {
      data: [12, 8, 3, 1],
      backgroundColor: [
        'rgb(0, 112, 186)',
        'rgb(0, 163, 0)',
        'purple',
        'pink'
      ],
      borderColor: [
        'white',
        'white',
        'white',
        'white'
      ],
      borderWidth: 1,
    },
  ],
};


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

const iconMap = {
  Desktop: (
    <SvgIcon>
      <ComputerDesktopIcon />
    </SvgIcon>
  ),
  Tablet: (
    <SvgIcon>
      <DeviceTabletIcon />
    </SvgIcon>
  ),
  Phone: (
    <SvgIcon>
      <PhoneIcon />
    </SvgIcon>
  )
};

export const OverviewTraffic = () => {

  return (
    <Card sx={{ height: '430px', width: '330px' }}>
      <CardHeader title="Tipo de pagos mas usados" />
      <CardContent>
        <div height={350} >
          <Pie data={data} />

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
