/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { URL } from '../data/URL';
import '../styles/InformacionAuto.css'
import { IMAGE } from '../data/URL';
import PaypalButton from './PaypalButon';


export default function Product() {
    const { id_auto } = useParams();
    const [data, setAutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [IvaPrice, setIvaPrice] = useState(0);
    const [maxEndDate, setMaxEndDate] = useState('');
    const [config, setConfig] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [reserva, setReserva] = useState({id_cliente: '', id_auto: '', fecha_entrega: '', fecha_devolucion: '', monto: '', estado: ''});
    const handlePaymentSelection = (event) => {
        setSelectedPayment(event.target.value);
    };

    const currentDate = new Date();
    const minDate = currentDate.toISOString().slice(0, 10); // Fecha actual

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`${URL}/autos/${id_auto}`);
            setAutos(await response.json());
            setLoading(false);
        };
        getProduct();
    }, [id_auto]);


    useEffect(() => {
        const calculateTotalPrice = () => {
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const pricePerDay = parseFloat(data.precio);
                const totalPrice = diffDays * pricePerDay;
                const precioIva = totalPrice + (totalPrice * config.iva);
                setTotalPrice(totalPrice);
                setIvaPrice(precioIva);
            }
        };

        calculateTotalPrice();
    }, [startDate, endDate, data.precio]);

    const handleStartDateChange = (event) => {
        const selectedStartDate = event.target.value;
        setStartDate(selectedStartDate);
        setEndDate(''); // Reiniciar la fecha de devolución al cambiar la fecha de alquiler

        // Actualizar la fecha máxima seleccionable en el campo de Fecha Devolución
        const selectedStart = new Date(selectedStartDate);
        const maxEndDate = new Date(selectedStart.getTime() + config.diasMaximo * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        setMaxEndDate(maxEndDate);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const Loading = () => {
        return <div>Loading....</div>;
    };
    useEffect(() => {
        fetch(`${URL}/config`)
            .then(response => response.json())
            .then(data => setConfig(data))
            .catch(error => console.log(error));
    }, [])

    //funcion de pagar 
    const Pagar = () => {
        reserva.id_auto = data.id_auto;
        reserva.fecha_devolucion = startDate;
        reserva.fecha_devolucion = endDate;
        reserva.monto = IvaPrice;
        reserva.estado = 'PENDIENTE';
        Swal.fire({
            title: 'Estas seguro de realizar el alquiler?',
            text: 'Auto: ' + data.marca +'  ' + data.modelo + ' Valor: $' + IvaPrice +'',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, confirmar!'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: '¡Exito!',
                    title: 'Se ha guardado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    const ShowProduct = () => {
        return (
            <div className="container-auto">
                <div className='container-img'>
                    <img src={`${IMAGE}/${data.fotos}`} alt={data.title} height="300px" width="300px" />
                </div>
                <div className="container-info">
                    <h4 className="text-uppercase text-black-50">Marca: {data.marca}</h4>
                    <h4 className="text-uppercase text-black-50">Modelo: {data.modelo}</h4>
                    <div className="fechas">
                        <div>
                            <label htmlFor="startDate" className="text">Fecha Alquiler</label>
                            <input className="form-control" type="date" value={startDate} onChange={handleStartDateChange} placeholder="Fecha de inicio" min={minDate} />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="text">Fecha Devolución</label>
                            <input type="date" className="form-control" value={endDate} onChange={handleEndDateChange} placeholder="Fecha de fin" min={startDate} max={maxEndDate} />
                        </div>
                    </div>
                    <h3 className="display-6 fw-bold my-4">Precio diario: ${data.precio}</h3>
                    <h4 className="display-6 fw-bold"> Total: ${totalPrice}</h4>
                    <h4 className="display-6 fw-bold"> Total incluido iva({config.iva}): ${IvaPrice}</h4>
                    <p className="lead">Detalles vehiculo: {data.detalles}</p>
                    <p className="lead">Estado: {data.estado}</p>
                    <p className="lead">Tipo Vehiculo: {data.tipo}</p>
                    <div>
                        <div>
                            <label>Elige el tipo de pago</label>
                        </div>
                        <div className='metodo-pago'>
                            <input type="radio" name="tipo-pago" value="TRASNFERENCIA" id="TRASNFERENCIA" onChange={handlePaymentSelection} />
                            <label>Transferencia</label>
                            <input type="radio" name="tipo-pago" value="FISICO" id="FISICO" onChange={handlePaymentSelection} />
                            <label>Efectivo</label>
                            <input type="radio" name="tipo-pago" value="OTRO" id="OTRO" onChange={handlePaymentSelection} />
                            <label>Otro</label>
                            <input type="radio" name="tipo-pago" value="PAYPAL" id="PAYPAL" onChange={handlePaymentSelection} />
                            <label>PayPal</label>
                        </div>
                        <div className='OpcionesPago'>
                            {selectedPayment !== "Paypal" && (
                                <button className="btn btn-outline-dark ms-2" onClick={Pagar}>
                                    Pagar
                                </button>
                            )}
                            {selectedPayment === "Paypal" && (
                                <div className='PayPal'>
                                    <PaypalButton totalValue={totalPrice} invoice={`Por alquiler de: ${data.marca} - ${data.modelo}`} />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    return (
        <div>
            <div className="container-product">
                <div className="row">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    );
}
