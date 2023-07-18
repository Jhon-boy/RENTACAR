
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var beneficios = [0, 0, 0, 6, 8, 4, 3];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];

var midata = {
    labels: meses,
    datasets: [ // Cada una de las líneas del gráfico
        {
            label: 'Alquileres',
            data: beneficios,
            tension: 0.5,
            fill : true,
            borderColor: 'black',
            backgroundColor: 'rgb(173, 216, 230)',
            pointRadius: 5,
            pointBorderColor: 'black',
            pointBackgroundColor: 'gray',
        },
        {
            label: 'Reservas',
            data: [0, 0, 0, 5, 4, 1, 7,]
        },
    ],
};

var misoptions = {
    scales : {
        y : {
            min : 0
        },
        x: {
            ticks: { color: 'gray'}
        }
    }
};


export const Dhistory = () => {
    // Datos del gráfico

    return (
        <div>
            <h2>Alquiler de Autos</h2>
            <div style={{ width: '800px', height: '800px' }}>
            <Line data={midata} options={misoptions}/>
            </div>
        </div>
    );
};