import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../data/URL';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export const Historial = () => {
    const { id } = useParams();
    const [historial, setHistorial] = useState([]);
    const [pagosData, setPagosData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const historialResponse = await axios.get(`${URL}/historial/${id}`);
          setHistorial(historialResponse.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [id]);
  
    useEffect(() => {
      const fetchPagosData = async () => {
        const pagosDataArray = [];
  
        for (const item of historial) {
          try {
            const pagosResponse = await axios.get(`${URL}/pagos/${item.id_pago}`);
            pagosDataArray.push(pagosResponse.data);
          } catch (error) {
            console.error(error);
            pagosDataArray.push(null);
          }
        }
  
        setPagosData(pagosDataArray);
      };
  
      fetchPagosData();
    }, [historial]);
  
    const renderTable = () => {
      if (historial.length === 0) {
        return <p>No hay historial disponible</p>;
      }
  
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha Renta</TableCell>
                <TableCell>Comentario</TableCell>
                <TableCell>ID Cliente</TableCell>
                <TableCell>ID Pago</TableCell>
                <TableCell>ID Auto</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historial.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id_historial}</TableCell>
                  <TableCell>{item.fecha_renta}</TableCell>
                  <TableCell>{item.comentario}</TableCell>
                  <TableCell>{item.id_cliente}</TableCell>
                  <TableCell>{item.id_pago}</TableCell>
                  <TableCell>{pagosData[index]?.id_auto}</TableCell>
                  <TableCell>{pagosData[index]?.tipo}</TableCell>
                  <TableCell>{pagosData[index]?.monto}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    };
  
    return (
      <div className="page-content">
        <div className="home-container">
          <h2>Historial</h2>
          {renderTable()}
        </div>
      </div>
    );
  };