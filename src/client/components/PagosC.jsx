/* eslint-disable react/prop-types */
import '../styles/Pagos.css'
import CustomizedBreadcrumbs from './StyledBreadcrumb';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { URL } from '../data/URL'
import { FaPaypal, FaMoneyBillAlt, FaCreditCard, FaQuestion } from 'react-icons/fa';
import CardPago from './CardPago';

export const PagosC = (props) => {

  const cliente = props.cliente;
  const [pagos, setPagos] = useState([]);
  const [clientes, setClientes] = useState({});
  const [autos, setAutos] = useState({});
  const [filtroTipo, setFiltroTipo] = useState('');
  const [pagosFiltrados, setPagosFiltrados] = useState([]);

  useEffect(() => {
    fetch(`${URL}/pagos`)
      .then(response => response.json())
      .then(data => {
        setPagos(data);
        setPagosFiltrados(data);
      })
      .catch(error => console.log(error));

    fetch(`${URL}/clientes`)
      .then(response => response.json())
      .then(data => {
        const clientesMap = {};
        data.forEach(cliente => {
          clientesMap[cliente.id_cliente] = {
            nombre: cliente.nombre,
            apellido: cliente.apellido
          };
        });
        setClientes(clientesMap);
      })
      .catch(error => console.log(error));

    fetch(`${URL}/autos`)
      .then(response => response.json())
      .then(data => {
        const autosMap = {};
        data.forEach(auto => {
          autosMap[auto.id_auto] = {
            marca: auto.marca,
            modelo: auto.modelo
          };
        });
        setAutos(autosMap);
      })
      .catch(error => console.log(error));
  }, []);

  const getNombreCompletoCliente = idCliente => {
    const cliente = clientes[idCliente];

    if (cliente) {
      const aux = `${cliente.nombre}  ${cliente.apellido}`
      return aux;
    }
    return '';
  };

  const getMarcaModeloAuto = idAuto => {
    const auto = autos[idAuto];
    if (auto) {
      return `${auto.marca} ${auto.modelo}`;
    }
    return '';
  };

  const handleTipoFilter = () => {
    if (filtroTipo) {
      const pagosFiltrados = pagos.filter(pago => pago.tipo.toLowerCase() === filtroTipo.toLowerCase());
      setPagosFiltrados(pagosFiltrados);
    } else {
      setPagosFiltrados(pagos);
    }
  };
  const getFormattedDate = (date) => {
    const diaDelMes = date.getDate();
    const diaDeLaSemana = date.toLocaleDateString('es', { weekday: 'long' });
    const mes = date.toLocaleDateString('es', { month: 'long' });

    return `${diaDeLaSemana}, ${diaDelMes} de ${mes}`;
  };

  const getPaymentIcon = (tipo) => {
    switch (tipo) {
      case 'PAYPAL':
        return <FaPaypal color="#0070ba" style={{ height: 40 }} />;
      case 'TRANSFERENCIA':
        return <FaMoneyBillAlt color="green" style={{ height: 40 }} />;
      case 'FISICO':
        return <FaCreditCard color="purple" style={{ height: 40 }} />;
      case 'OTRO':
        return <FaQuestion color="gray" style={{ height: 40 }} />;
      default:
        return null;
    }
  };


  return (
    <div>
      <div className="container" style={{ marginTop: '110px' }}>
        <CustomizedBreadcrumbs />
      </div>
      <div>
        <div className='Portadas'>
          <div className='Table'>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', minWidth: '520px', height: '20px', marginBottom: '20px' }} fullWidth>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="filtro-tipo-label">Filtrar por Tipo</InputLabel>
                  <Select
                    labelId="filtro-tipo-label"
                    id="filtro-tipo-select"
                    value={filtroTipo}
                    onChange={e => setFiltroTipo(e.target.value)}
                    label="Filtrar por Tipo"
                  >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="FISICO">Fisico</MenuItem>
                    <MenuItem value="TRANFERENCIA">Tranferencia</MenuItem>
                    <MenuItem value="PAYPAL">PAYPAL</MenuItem>
                    <MenuItem value="OTRO">Otros</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" onClick={handleTipoFilter} sx={{ ml: 3 }}>
                  Filtrar
                </Button>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Identificador</TableCell>
                      <TableCell>Fecha del Pago</TableCell>
                      <TableCell>Tipo de Pago</TableCell>
                      <TableCell>Monto Pagado</TableCell>
                      <TableCell>Registrado a</TableCell>
                      <TableCell>Auto Alquilado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pagosFiltrados.map(pago => {
                      if (pago.id_cliente === cliente.id_cliente) {
                        return (
                          <TableRow key={pago.id_pago}>
                            <TableCell>{pago.id_pago}</TableCell>

                            <TableCell style={{ width: 140 }}>
                              {getFormattedDate(new Date(pago.fecha_pago))}
                            </TableCell>
                            <TableCell  >{getPaymentIcon(pago.tipo)} {pago.tipo}</TableCell>

                            <TableCell>{pago.monto}</TableCell>
                            <TableCell style={{ width: 140 }}>{getNombreCompletoCliente(pago.id_cliente)}</TableCell>
                            <TableCell>{getMarcaModeloAuto(pago.id_auto)}</TableCell>
                          </TableRow>
                        )
                      } else {
                        return null;
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </div>
          <div style={{ marginTop: '120px' }}>
            <CardPago cliente={cliente} />
          </div>

        </div>
      </div>
    </div>
  )
}

