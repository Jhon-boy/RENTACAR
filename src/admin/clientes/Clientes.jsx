/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { URL } from '../data/URL';

import Swal from 'sweetalert2';
import { Routes, Route } from 'react-router-dom';
import { eliminarCliente } from '../database/ClientController';

import { ClientsPending } from './ClientsPending'
import { ClientsNo } from './ClientsNo'
import  Listado  from './Listado'
import { CardClientes } from './CardClientes';
import { InfoClient } from './InfoClient'
import stil from './Clientes.module.css'
import { Historial } from './Historial';
import { Profile } from './Profile';


const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [datosCombinados, setDatosCombinados] = useState([]);
  // eslint-disable-next-line no-unused-vars
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

  return (
    <section className={stil.contentClientes}>
      <Routes>
        <Route path='/' element={<Listado />}></Route>
        <Route path='/CardClient' element={<CardClientes></CardClientes>}></Route>
        <Route path='/InfoClient/:id' element={<InfoClient />} />
        <Route path='/clientesPending' element={<ClientsPending />} />
        <Route path='/clientesNo' element={<ClientsNo />} />
        <Route path='/Historial/:id' element={<Historial />}/>
        <Route path='/Perfil/:id' element={<Profile />} />
      </Routes>
    </section>
  );
};

export default Clientes;
