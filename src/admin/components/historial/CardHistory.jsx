/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
//import '../../styles/Card.css'
import { IMAGE } from '../../data/URL';
import { URL } from '../../data/URL';
export const CardHistory = ({ historial }) => {
  const [cliente, setCliente] = useState({});
  const [reserva, setReserva] = useState({});
  const [pago, setPago] = useState({});
  const [autos, setAutos] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clienteResponse = await axios.get(`${URL}/clientes/${historial.id_cliente}`);
        setCliente(clienteResponse.data);

        const reservaResponse = await axios.get(`${URL}/reservas/${historial.id_cliente}`);
        setReserva(reservaResponse.data);

        const pagosResponse = await axios.get(`${URL}/pagosCliente/${historial.id_cliente}`);
        setPago(pagosResponse.data);

        const autoResponse = await axios.get(`${URL}/autos/${reservaResponse.data.id_auto}`);
        setAutos(autoResponse.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [historial.id_cliente]);

  return (
    <div className="card">
      <div className="avatar-container">
        <div className="column">
          {autos && (
            <>
              <img src={`${IMAGE}/${autos.fotos}`} alt="Foto del auto" className="avatar" />
              <div className="columnInfo">
                <h6 className='subTitleCar'>{autos.marca} {autos.modelo}</h6>
                <h6 className='subTitleCar'> - {autos.placas}</h6>
              </div>
            </>
          )}
        </div>
        <div>
          <div className="columnInfo">
            <div>
              <span className="title">ID:</span>
              <h6 className='subTitle'>{historial.id_historial}</h6>
              <span className="title">FECHA RENTA:</span>
              <h6 className='subTitle'>{historial.fecha_renta}</h6>
              <span className="title">Comentario:</span>
              <h6 className='subTitle'>{historial.comentario}</h6>
            </div>
            <div className='Paper'>
              <span className="title">ID cliente:</span>
              <h6 className='subTitle'>{historial.id_cliente}</h6>
              <span className="title">ID pago:</span>
              <h6 className='subTitle'>{historial.id_pago}</h6>
            </div>
            {cliente && (
              <>
                <div className="columnInfo">
                  <span className="title">Nombre:</span>
                  <h6 className='subTitle'>{cliente.nombre}</h6>
                  <h6 className='subTitle'>{cliente.apellido}</h6>
                </div>
              </>
            )}
            {reserva && (
              <>
                <div className="columnInfo">
                  <span className="title">Monto:</span>
                  <h6 className='subTitle'>{reserva.monto}</h6>
                  <span className="title">Estado:</span>
                  <h6 className='subTitle'>{reserva.estado}</h6>
                  <span className="title">Tipo de Pago:</span>
                  <h6 className='subTitle'>{pago.tipo}</h6>
                  <span className="title">Fecha Pago:</span>
                  <h6 className='subTitle'>{pago.fecha_pago}</h6>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
