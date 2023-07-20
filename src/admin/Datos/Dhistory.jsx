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
import { useEffect, useState } from 'react';
import { URL } from '../data/URL';

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

export const Dhistory = () => {
    const [pagos, setPagos] = useState([]);
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const cargarPagos = async () => {
            try {
                const responsePagos = await fetch(`${URL}/pagos`);
                const pagosData = await responsePagos.json();
                setPagos(pagosData);
            } catch (error) {
                console.error(error);
            }
        };

        const cargarReservas = async () => {
            try {
                const responseReservas = await fetch(`${URL}/reservas`);
                const reservasData = await responseReservas.json();
                setReservas(reservasData);
            } catch (error) {
                console.error(error);
            }
        };

        cargarPagos();
        cargarReservas();
    }, []);

    // Función para clasificar los datos por mes y obtener beneficios y reservas por mes
    const clasificarDatosPorMes = (datos) => {
        // Arreglos para almacenar la cantidad de datos y los datos por mes
        const datosPorMes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        const mesesArr = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre"];

        // Iterar sobre los datos y clasificarlos por mes
        datos.forEach((dato) => {
            const fecha = new Date(dato.fecha_devolucion || dato.fecha_pago); // Usamos fecha_devolucion para las reservas y fecha_pago para los pagos
            const mes = fecha.getMonth();

            // Incrementar el contador de datos para el mes correspondiente
            datosPorMes[mes]++;
        });

        return {
            datos: datosPorMes,
            meses: mesesArr,
        };
    };

    // Clasificar los pagos y reservas por mes y obtener los datos para el gráfico
    const { datos: datosPagos, meses } = clasificarDatosPorMes(pagos);
    const { datos: datosReservas } = clasificarDatosPorMes(reservas);

    // Datos del gráfico
    const midata = {
        labels: meses,
        datasets: [
            {
                label: 'Alquileres',
                data: datosPagos,
                tension: 0.5,
                fill: true,
                borderColor: 'black',
                backgroundColor: 'rgb(173, 216, 230)',
                pointRadius: 5,
                pointBorderColor: 'black',
                pointBackgroundColor: 'gray',
            },
            {
                label: 'Reservas',
                data: datosReservas,
                tension: 0.1,
                pointBorderColor: 'black',
                pointBackgroundColor: 'gray',
            },
        ],
    };

    const misoptions = {
        scales: {
            y: {
                min: 0,
            },
            x: {
                ticks: { color: 'gray' },
            },
        },
    };

    return (
        <div>
            <h2>Alquiler de Autos</h2>
            <div style={{ width: '800px', height: '800px' }}>
                <Line data={midata} options={misoptions} />
            </div>
        </div>
    );
};
