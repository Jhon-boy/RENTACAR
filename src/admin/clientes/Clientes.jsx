import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { URL } from '../data/URL';
import '../Home.css';
import { MdToggleOff } from "react-icons/md";
import { MdToggleOn } from "react-icons/md";

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [datosCombinados, setDatosCombinados] = useState([]);

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

  const handleDelete = (cedula) => {
    // Aquí puedes implementar la lógica para eliminar un cliente con la cédula proporcionada
    alert('Eliminar cliente con Cédula V2: ' + cedula);
  };

  const handleEdit = (id_cliente) => {
    // Aquí puedes implementar la lógica para editar un cliente con el ID proporcionado
    alert('Editar cliente con ID: '+ id_cliente);
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
      cell:(row) =>{
        if(row.estado === "CONECTADO"){
          return <MdToggleOn  className='icon activeP'/>
        }else{
          return <MdToggleOff  className='icon noactive'/>
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
      name: 'Editar',
      cell: (row) => (
        <button className='warning' onClick={() => handleEdit(row.id_cliente)}>Editar</button>
      ),
      button: true,
    },
    {
      name: 'Ver Perfil',
      cell: (row) => (
        <button onClick={() => handleEdit(row.id_cliente)}>Editar</button>
      ),
      button: true,
    },
  ];

  return (
    <div className='page-content'>
      <div className='home-container'>
        <div> ADMINISTRAR CLIENTES</div>
        <h1>HOLA BEBE</h1>
        <DataTable
          columns={columns}
          data={datosCombinados}
          title="Clientes Registrados "
          pagination
        />
      </div>
    </div>
  );
};

export default Clientes;
