
import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from 'react-bootstrap/Button';


import { URL } from '../data/URL';
export const TableAutos = () => {
    const [cars, setCars] = useState([]);


    useEffect(() => {
        fetch(`${URL}/autos`)
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>PLACAS</TableCell>
                        <TableCell>MARCA</TableCell>
                        <TableCell>MODELO</TableCell>
                        <TableCell>AÑO</TableCell>
                        <TableCell>ESTADO</TableCell>
                        <TableCell>OPCIONES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cars.map((car, index) => (
                        <TableRow key={car.placas}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{car.placas}</TableCell>
                            <TableCell>{car.marca}</TableCell>
                            <TableCell>{car.modelo}</TableCell>
                            <TableCell>{car.anio}</TableCell>
                            <TableCell>{car.estado}</TableCell>
                            <TableCell>
                                <div>
                                <Button variant="danger">Eliminar</Button>{' '}
                                <Button variant="warning">Editar</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
