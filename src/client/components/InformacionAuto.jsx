/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { URL } from '../data/URL';
import '../styles/InformacionAuto.css';
import { IMAGE } from '../data/URL';
import PaypalButton from './PaypalButon';
import { CrearReserva } from '../controllers/reserva.controller';
import { CardClient } from './CardClient';

export default function Product(props) {
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
  const [reserva, setReserva] = useState({ fecha_entrega: '', fecha_devolucion: '', monto: '', estado: '', id_auto: '', id_cliente: '' });
  const cliente = props.cliente;

  const handlePaymentSelection = (event) => {
    setSelectedPayment(event.target.value);
  };

  const currentDate = new Date();
  const minDate = currentDate.toISOString().slice(0, 10); // Fecha actual

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const responseAutos = await fetch(`${URL}/autos/${id_auto}`);
      setAutos(await responseAutos.json());
      setLoading(false);
    };

    fetchData();
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
        const precioIva = totalPrice + totalPrice * config.iva;
        setTotalPrice(totalPrice.toFixed(2));
        setIvaPrice(precioIva.toFixed(2));
      }
    };

    calculateTotalPrice();
  }, [startDate, endDate, data.precio, config.iva]);

  const handleStartDateChange = (event) => {
    const selectedStartDate = event.target.value;
    setStartDate(selectedStartDate);
    setEndDate('');

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
      .then((response) => response.json())
      .then((data) => setConfig(data))
      .catch((error) => console.log(error));
  }, []);

  const Pagar = async () => {
    reserva.fecha_entrega = startDate;
    reserva.fecha_devolucion = endDate;
    reserva.monto = IvaPrice;
    reserva.id_auto = id_auto;
    reserva.id_cliente = cliente.id_cliente;
    reserva.estado = 'PENDIENTE';

    Swal.fire({
      title: '¿Estás seguro de realizar el alquiler?',
      text: `Auto: ${data.marca} ${data.modelo} | Valor: $${IvaPrice}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await CrearReserva(reserva);
          console.log(reserva);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha guardado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          setReserva(null);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal',
            footer: '<a href="">Contactarse con el administrador</a>',
          });
        }
      } else if (result.isDenied) {
        Swal.fire('No se realizó el Pago', '', 'info');
      }
    });
  };

  const ShowProduct = () => {
    return (
      <div className="container-general" style={{marginTop: '20px'}}> 
        <div className="container-main">
          <div className="container-img">
            <img src={`${IMAGE}/${data.fotos}`} alt={data.title} />
          </div>
          <div className='Global'>
          <h4>Cotiza tu Auto</h4>
            <div className="container-info-autos">
              <div className="titles">
                <h4 className="text-uppercase">
                  Marca Auto:
                </h4>
                <h4 className="text-uppercase">
                  Modelo:
                </h4>
                <h4 className="lead">
                  Detalles vehiculo:
                </h4>
                <h4 className="lead">
                  Estado:
                </h4>
                <h4 className="lead" >
                  Tipo auto:
                </h4>
                <h4 className="display-6 fw-bold my-4" style={{marginTop:'10px'}}>
                  Precio diario:
                </h4>
                <h4 className="display-6 fw-bold">
                  Total:
                </h4>
                <h4 className="display-6 fw-bold" >
                  Total incluido IVA:
                  {' '}
                </h4>
              </div>
              <div className="info">
                <h4 className="text-uppercase ">
                  {data.marca}
                </h4>
                <h4 className="text-uppercase ">
                  {data.modelo}
                </h4>
                <h4 className="lead">
                  {data.detalles}
                </h4>
                <h4 className="lead">
                  {data.estado}
                </h4>
                <h4 className="lead">
                  {data.tipo}
                </h4>
                <h4 className="display-6 fw-bold my-4" style={{ marginTop: '10px'}}>
                  $ {data.precio}
                </h4>
                <h4 className="display-6 fw-bold">
                  $ {totalPrice}
                </h4>
                <h4 className="display-6 fw-bold">
                  $ {IvaPrice}
                </h4>
              </div>
            </div>
            <div className="fechas">
              <div>
                <label htmlFor="startDate" className="text1">
                  Fecha Alquiler
                </label>
                <input
                  className="form-control fechas_date"
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  placeholder="Fecha de inicio"
                  min={minDate}
                />
              </div>
              <div>
                <label htmlFor="endDate" className="text1">
                  Fecha Devolución
                </label>
                <input
                  type="date"
                  className="form-control fechas_date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  placeholder="Fecha de fin"
                  min={startDate}
                  max={maxEndDate}
                />
              </div>
            </div>
            <div>
              {cliente.estado === 'HABILITADO' ? (
                <div>
                  <div>
                    <label>
                      <span className="Span">Elige tipo de pago:</span>{' '}
                    </label>
                  </div>
                  <div className="metodo-pago">
                    <input
                      type="radio"
                      name="tipo-pago"
                      value="TRANSFERENCIA"
                      id="TRANSFERENCIA"
                      onChange={handlePaymentSelection}
                      disabled={data.estado !== 'DISPONIBLE'}
                    />
                    <label>Transferencia</label>
                    <input
                      type="radio"
                      name="tipo-pago"
                      value="EFECTIVO"
                      id="EFECTIVO"
                      onChange={handlePaymentSelection}
                      disabled={data.estado !== 'DISPONIBLE'}
                    />
                    <label>Efectivo</label>
                    <input
                      type="radio"
                      name="tipo-pago"
                      value="OTRO"
                      id="OTRO"
                      onChange={handlePaymentSelection}
                      disabled={data.estado !== 'DISPONIBLE'}
                    />
                    <label>Otro</label>
                    <input
                      type="radio"
                      name="tipo-pago"
                      value="Paypal"
                      id="Paypal"
                      onChange={handlePaymentSelection}
                      disabled={data.estado !== 'DISPONIBLE'}
                    />
                    <label>PayPal</label>
                  </div>
                  <div className="OpcionesPago">
                    {selectedPayment !== 'Paypal'  (
                      <button className="btn btn-outline-dark ms-2" onClick={Pagar}>
                        Pagar
                      </button>
                    )}
                    {selectedPayment === 'Paypal'(
                      <div className="PayPal" style={{ width: '450px' }}>
                        <PaypalButton
                          totalValue={IvaPrice}
                          invoice={`Por alquiler de: ${data.marca} - ${data.modelo}`}
                          id_auto={data.id_auto}
                          id_cliente={cliente.id_cliente}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button className="btn btn-outline-danger">
                  No estás habilitado para alquilar este vehículo
                </button>
              )}
            </div>
          </div>
          <div className="cliente">
            <CardClient cliente={cliente} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container-product">
          {loading ? <Loading /> : <ShowProduct />}
      </div>
    </div>
  );
}
