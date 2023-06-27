import '../Home.css'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import { MdRestoreFromTrash } from "react-icons/md";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { Modal } from '@mui/material';
import { MdEditNote } from 'react-icons/md';

import { URL } from '../data/URL';
import { eliminarAuto } from '../database/controller';
import { ModalChangeState } from './ModalChangeState';


export const TableAutos = () => {
    const [cars, setCars] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [tempId, setTempId] = useState(0);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    const handleOpenModal = () => {
        const { clientX, clientY } = event;
        setModalPosition({ x: clientX, y: clientY });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const modalStyle = {
        top: modalPosition.y,
        left: modalPosition.x,
        position: 'absolute',
        border: '1px solid black',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    };

    useEffect(() => {
        fetch(`${URL}/autos`)
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.log(error));
    }, []);

    const handleDelete = async (id_auto) => {
        try {
            await eliminarAuto(id_auto);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo Salio mal',
                text: 'Error: ' + error.message,
            });
        }

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
            cell: (row) => (
                <div className='ModalP'>
                    <Button variant="contained" onClick={() => { setTempId(row.id_auto); handleOpenModal(); }}>
                        {row.estado} <MdEditNote />
                    </Button>
                    <Modal open={showModal} onClose={handleCloseModal} className='ModalP'>
                        <div className="modal-container" style={modalStyle}>
                            <ModalChangeState idAuto={tempId} estado={row.estado} />
                        </div>
                    </Modal>
                </div>
            ),
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
                    <Button className="danger" onClick={() => handleDelete(row.id_auto)}><MdRestoreFromTrash /> </Button>{'-  '}
                    <Link to={`/EditCar/${row.id_auto}`}>   <Button className="warning"><MdEditNote /></Button></Link>{'-  '}
                    <Link to={`/Autos/${row.id_auto}`}>
                        <Button className="sucess" ><MdEditNote /></Button>
                    </Link>

                </div>
            ),
        },
        {
            name: ' + Detalles',
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
        <>
            <DataTable
                columns={columns}
                data={cars}
                title="Autos"
                pagination
            />

        </>

    )
}
