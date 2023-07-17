//import '../../Home.css'
//import '../../styles/Config.css'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { URL } from '../../data/URL';
import Buscador from './Buscador ';


export const Pagos = () => {
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
            return `${cliente.nombre} ${cliente.apellido}`;
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
    return (
        <div className='page-content'>
            <div className='home-container'>
                TABLA DE PAGOS :V
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', minWidth: '230px' }} fullWidth>
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
                                <MenuItem value="FISICO">Pagos Fisico</MenuItem>
                                <MenuItem value="TRANFERENCIA">Pagos por Tranferencia</MenuItem>
                                <MenuItem value="PAYPAL">Pagos por PAYPAL</MenuItem>
                                <MenuItem value="OTRO">Otros</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={handleTipoFilter} sx={{ ml: 3 }}>
                            Filtrar
                        </Button>
                        <Buscador />
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID Pago</TableCell>
                                    <TableCell>Fecha de Pago</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Monto</TableCell>
                                    <TableCell>Cliente</TableCell>
                                    <TableCell>Auto</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pagosFiltrados.map(pago => (
                                    <TableRow key={pago.id_pago}>
                                        <TableCell>{pago.id_pago}</TableCell>
                                        <TableCell>{pago.fecha_pago}</TableCell>
                                        <TableCell>{pago.tipo}</TableCell>
                                        <TableCell>{pago.monto}</TableCell>
                                        <TableCell>{getNombreCompletoCliente(pago.id_cliente)}</TableCell>
                                        <TableCell>{getMarcaModeloAuto(pago.id_auto)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </div>
        </div>
    )
}
