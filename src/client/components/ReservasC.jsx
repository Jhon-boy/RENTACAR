/* eslint-disable react/prop-types */
import '../styles/Pagos.css';
import CustomizedBreadcrumbs from './StyledBreadcrumb';
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import {  MdClose } from 'react-icons/md';
import VerifiedIcon from '@mui/icons-material/Verified';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import { URL } from '../data/URL';
import InfoPago from './InfoPago';

export const ReservasC = (props) => {
  const cliente = props.cliente;
  const [reservas, setReservas] = useState([]);
  const [autos, setAutos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch(`${URL}/reservas`)
      .then((response) => response.json())
      .then((data) => setReservas(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${URL}/autos`)
      .then((response) => response.json())
      .then((data) => setAutos(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${URL}/clientes`)
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.log(error));
  }, []);

  const getMarcaModeloAuto = (idAuto) => {
    const auto = autos.find((auto) => auto.id_auto === idAuto);
    return auto ? `${auto.marca} ${auto.modelo}` : '';
  };

  const getNombreCliente = (idCliente) => {
    const cliente = clientes.find((cliente) => cliente.id_cliente === idCliente);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : '';
  };

  const getCurrentStatus = (row) => {
    const fechaActual = new Date();
    const fechaEntrega = new Date(row.fecha_entrega);
    const fechaDevolucion = new Date(row.fecha_devolucion);

    if (fechaActual < fechaEntrega) {
      return (
        <HourglassFullIcon style={{ color: 'skyblue' }} />
      );
    } else if (fechaActual > fechaDevolucion) {
      return (
        <MdClose style={{ color: 'red' }} />
      );
    } else {
      return (
        <VerifiedIcon style={{ color: 'green' }} />
      );
    }
  };

  const getFormattedDate = (date) => {
    const diaDelMes = date.getDate();
    const diaDeLaSemana = date.toLocaleDateString('es', { weekday: 'long' });
    const mes = date.toLocaleDateString('es', { month: 'long' });

    return `${diaDeLaSemana}, ${diaDelMes} de ${mes}`;
  };
  return (
    <div>
      <div className="container" style={{ marginTop: '110px' }}>
        <CustomizedBreadcrumbs />
      </div>
      <div className='Portadas'>
        <div className='Table' style={{marginTop: '150px' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Auto</TableCell>
                  <TableCell>Registrado</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Desde</TableCell>
                  <TableCell>Hasta</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservas.map((row) => {
                  if (row.id_cliente === cliente.id_cliente) {
                    return (
                      <TableRow key={row.id_reserva}>
                        <TableCell>{getMarcaModeloAuto(row.id_auto)}</TableCell>
                        <TableCell>{getNombreCliente(row.id_cliente)}</TableCell>
                        <TableCell>{row.estado}</TableCell>
                        <TableCell>
                        {getFormattedDate(new Date(row.fecha_entrega))}
                        </TableCell>
                        <TableCell>
                        {getFormattedDate(new Date(row.fecha_devolucion ))}
                        </TableCell>
                        <TableCell>{row.monto}</TableCell>
                        <TableCell>{getCurrentStatus(row)}</TableCell>
                      </TableRow>
                    );
                  } else {
                    return null; // Omitir fila si el id del cliente no coincide
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{marginTop: '120px' }}>
           <InfoPago  cliente={cliente} />
        </div>
       
      </div>

    </div>
  );
}  