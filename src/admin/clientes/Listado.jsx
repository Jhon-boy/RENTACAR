import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { URL } from '../data/URL';
//import '../Home.css';
import { MdToggleOff } from "react-icons/md";
import { MdToggleOn } from "react-icons/md";
//import { SliderBar } from './SliderBar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { eliminarCliente } from '../database/ClientController';

import SliderBar from '/src/admin/SliderBar.jsx'
import { BtnClientes } from '../data/BtnAdmin.js'
import customStyles from '../config/ConfigTable'
import stil from './Clientes.module.css'

const Listado = () => {
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [datosCombinados, setDatosCombinados] = useState([]);
  const [activeTab, setActiveTab] = useState('all');


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

  const handleDelete = async (id) => {
    // Aquí puedes implementar la lógica para eliminar un cliente con la cédula proporcionada
    Swal.fire({
      title: 'Esta seguro de eliminar los datos del cliente?',
      text: "Puedes modificar los datos despues!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarCliente(id);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente elimnado',
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
      }
    });

  };

  const columns = [
    {
      name: 'Id',
      selector: 'id_cliente',
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: 'nombre',
      sortable: true,
    },
    {
      name: 'Apellido',
      selector: 'apellido',
      sortable: true,
    },
    {
      name: 'Correo',
      selector: 'correo',
      sortable: true,
    },
    {
      name: 'Cédula',
      selector: 'cedula',
      sortable: true,
    },
    {
      name: 'Estado',
      cell: (row) => {
        if (row.estado === "CONECTADO") {
          return <MdToggleOn className='icon activeP' />
        } else {
          return <MdToggleOff className='icon noactive' />
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
      name: 'Eliminar',
      cell: (row) => (
        <button className='danger' onClick={() => handleDelete(row.id_cliente)}>Eliminar</button>
      ),
      button: true,
    },
    {
      name: 'Ver Historial',
      cell: (row) => (
        <Link to={`/Historial/${row.id_cliente}`}>
           <button className='warning'>Historial</button>
        </Link>
       
      ),
      button: true,
    },
    {
      name: 'Ver Perfil',
      cell: (row) => (
        <Link to={`/InfoClient/${row.id_cliente}`}>
          <button>Editar</button>
        </Link>
      ),
      button: true,
    },
  ];
  return (
    <section className={stil.sectionTabla}>
        <SliderBar btnDatos={BtnClientes}/>
      <div className={stil.contentTabla}>
        <DataTable
          columns={columns}
          data={datosCombinados}
          customStyles={customStyles}
          title="Clientes Registrados "
          pagination
          highlightOnHover
					striped
					dense
					paginationPerPage={10}
					paginationRowsPerPageOptions={[5, 10]}
        />
      </div>
    </section>
  );
};

export default Listado;
