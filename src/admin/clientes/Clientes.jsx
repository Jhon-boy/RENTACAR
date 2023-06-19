import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { URL } from '../data/URL';
import '../Home.css'

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch(`${URL}/clientes`)
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.log(error));
  }, []);

  const columns = [
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
      name: 'Cédula',
      selector: 'cedula',
      sortable: true,
    }
  ];

  return (
    <div className='page-content'>
      <div className='home-container'>
        <div> ADMINISTRAR CLIENTES</div>
        <hi>HOLA</hi>
        <DataTable
          columns={columns}
          data={clientes}
          title="Clientes"
          pagination
        />
      </div>
    </div>

  )
}

export default Clientes