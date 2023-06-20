import '../Home.css'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import { MdRestoreFromTrash } from "react-icons/md";
import { MdEditNote } from "react-icons/md"
import { Link } from 'react-router-dom'

import { URL } from '../data/URL';
export const TableAutos = () => {
    const [cars, setCars] = useState([]);


        useEffect(() => {
            fetch(`${URL}/autos`)
                .then(response => response.json())
                .then(data => setCars(data))
                .catch(error => console.log(error));
        }, []);

    const handleDelete = (placas) => {
        // Aquí puedes implementar la lógica para eliminar un auto con las placas proporcionadas
        alert('Eliminar auto con placas: ' + placas);
    };

    const handleEdit = (placas) => {
        // Aquí puedes implementar la lógica para editar un auto con las placas proporcionadas
        alert('Editar auto con placas: ' + placas);
    };

    const columns = [
        {
            name: 'Id',
            selector: 'id_auto',
            sortable: true,
        },
        {
            name: 'PLACAS',
            selector: 'placas',
            sortable: true,
        },
        {
            name: 'MARCA',
            selector: 'marca',
            sortable: true,
        },
        {
            name: 'MODELO',
            selector: 'modelo',
            sortable: true,
        },
        {
            name: 'AÑO',
            selector: 'anio',
            sortable: true,
        },
        {
            name: 'ESTADO',
            selector: 'estado',
            sortable: true,
        },
        {
            name: 'TIPO',
            selector: 'tipo',
            sortable: true,
        },
        {
            name: 'PRECIO',
            selector: 'precio',
            sortable: true,
        },
        {
            name: 'OPCIONES',
            cell: (row) => (
                <div className='options'>
                    <Button className="danger" onClick={() => handleDelete(row.placas)}><MdRestoreFromTrash /> </Button>{'-  '}
                    <Button className="warning" onClick={() => handleEdit(row.placas)}><MdEditNote /></Button>
                </div>
            ),
        },
        {
            name: 'Perfil',
            cell: (row) => (
                <div className='options'>
                    <Link to={`/Autos/${row.id_auto}`}>
                        <Button className="sucess" ><MdEditNote /></Button>
                    </Link>
                </div>
            ),
        },
    ];


    return (

        <DataTable
            columns={columns}
            data={cars}
            title="Autos"
            pagination
        />


    )
}
