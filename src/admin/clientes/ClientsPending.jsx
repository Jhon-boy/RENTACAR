import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { URL } from '../data/URL';
//import '../Home.css';
import { BsPersonExclamation } from "react-icons/bs";
import { BsPersonFillExclamation } from "react-icons/bs";
import { SliderBar } from './SliderBar';
import { Link } from 'react-router-dom';


export const ClientsPending = () => {
    const [clientes, setClientes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [datosCombinados, setDatosCombinados] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');


    useEffect(() => {
        fetch(`${URL}/clientes`)
            .then(response => response.json())
            .then(data => setClientes(data))
            .catch(error => console.log(error));

        fetch(`${URL}/user`)
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => console.log(error));

    }, []);

    useEffect(() => {
        // Combinar los datos de clientes y usuarios basándose en el campo id_usuario
        const datosCombinados = clientes.map(cliente => {
            const usuarioCorrespondiente = usuarios.find(usuario => usuario.id_usuario === cliente.id_usuario);
            return {
                ...cliente,
                ...usuarioCorrespondiente
            };
        });
        setDatosCombinados(datosCombinados);
    }, [clientes, usuarios]);
    const filteredReservas = clientes.filter((clientes) => clientes.estado === 'PENDIENTE');
    const columns = [
        {
            name: 'Id',
            selector: 'id_cliente',
            sortable: true,
            width: '90px',
        },
        {
            name: 'Nombre',
            selector: 'nombre',
            sortable: true,
            width: '120px',
        },
        {
            name: 'Apellido',
            selector: 'apellido',
            sortable: true,
            width: '120px',
        },
        {
            name: 'Cedula',
            selector: 'cedula',
            sortable: true,
            width: '120px',
        },
        {
            name: 'Estado de la cuenta',
            selector: 'estado',
            sortable: true,
        },
        {
            name: 'Estado',
            cell: (row) => {
                if (row.estado === "CONECTADO") {
                    return <BsPersonFillExclamation className='icon activeP' />
                } else {
                    return <BsPersonExclamation className='icon noactive' />
                }
            },
            sortable: true,
        },
        {
            name: 'Género',
            selector: 'genero',
            sortable: true,
        },
        {
            name: 'Ver Perfil',
            cell: (row) => (
                <Link to={`/InfoClient/${row.id_cliente}`}>
                    <button className='danger'>Revisar</button>
                </Link>
            ),
            button: true,
        },
    ];
    return (
        <div className='page-content'>
            <div className='home-container'>
                <div> ADMINISTRAR CLIENTES</div>
                <SliderBar activeTab={activeTab} setActiveTab={setActiveTab} />
                {filteredReservas.length > 0 && (
                    <DataTable
                        columns={columns}
                        data={filteredReservas}
                        title="Clientes Pendientes "
                        pagination
                    />
                )}
            </div>
        </div>
    );
};
