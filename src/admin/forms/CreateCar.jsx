/* eslint-disable no-unused-vars */
import { useState , useEffect} from 'react';
import '../Home.css';
import '../styles/Autos.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { obtenerModelosAutos } from  '../data/APIS.js'

import { registrarAuto } from '../database/controller';
import { useNavigate } from 'react-router-dom'


export const CreateCar = () => {

    const [placas, setPlacas] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [anio, setAnio] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [tipo, setTipo] = useState('');
    const [detalles, setDetalles] = useState('');
    const [fotos, setFotos] = useState('');
    const [estado, setEstado] = useState('');
    const [mostrarError, setMostrarError] = useState(false);

    const [modelosAutos, setModelosAutos] = useState([]);


    //FUNCION DE NAVEGACION 
    const history = useNavigate();
    const navigateTo = (path) => {
        history(path);
    }


    // valores iniciales 

    const crearAuto = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('placas', placas)
        formData.append('marca', marca)
        formData.append('modelo', modelo)
        formData.append('tipo', tipo)
        formData.append('anio', anio)
        formData.append('fotos', fotos)
        formData.append('estado', estado)
        formData.append('precio', precio)
        formData.append('detalles', detalles)



        try {
            // alert('DATOS RECIBIDOS: ')
            await registrarAuto(formData);
            // console.log('DATOS RECIBIDOS'+ car.detalles + ' FOTO:' + car.fotos);
            alert('DATOS INSERTADO CORRECTAMENTE');
            history('/Autos');
        } catch (error) {
            alert('SOMETHING WAS WRONG' + error.message)
        }

    }

    useEffect(() => {
        const obtenerDatos = async () => {
          const modelos = await obtenerModelosAutos();
          setModelosAutos(modelos);
        };
    
        obtenerDatos();
      }, []);
      

    return (
        <div className="CrearAuto">
            <div className="ContenidoAuto">
                <Form onSubmit={crearAuto} method="POST" encType='multipart/form-data' className="formulario" >
                    <Row className="mb-3">
                        <Form.Group className='ingresoD' controlId="forMarca">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ford"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='ingresoD' controlId="formModelo">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Raptor"
                                value={modelo}
                                onChange={(e) => setModelo(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group className='ingresoD' controlId="formPlacas">
                            <Form.Label>Placas</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CHW-2015"
                                value={placas}
                                onChange={(e) => setPlacas(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='ingresoD' controlId="formTipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select
                                as="select"
                                placeholder="Ingrese el Tipo"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                defaultValue="CAMIONETA"
                            >
                                <option value="">Seleccione</option>
                                <option value="CAMIONETA">CAMIONETA</option>
                                <option value="CAMIÓN LIGERO">CAMIÓN LIGERO</option>
                                <option value="SEDAN">SEDAN</option>
                                <option value="COUPE">COUPE</option>
                                <option value="CONVERTIBLE">CONVERTIBLE</option>
                                <option value="HATCHBACK">HATCHBACK</option>
                                <option value="STATION WAGON">STATION WAGON</option>
                                <option value="MINIVAN">MINIVAN</option>
                                <option value="UTILITARIO">UTILITARIO</option>
                                <option value="LIMOSINA">LIMOSINA</option>
                                <option value="FURGONETA DE PASAJEROS">FURGONETA DE PASAJEROS</option>
                                <option value="MICROBUS">MICROBUS</option>
                                <option value="MINIBUS">MINIBUS</option>
                                <option value="CAMIÓN MEDIANO">CAMIÓN MEDIANO</option>
                                <option value="CAMIÓN PESADO">CAMIÓN PESADO</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>


                    <Row className="mb-3">
                        <Form.Group className='ingresoD' controlId="formEstado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Select
                                type="text"
                                placeholder="Ingrese el Estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                defaultValue="INFUERA DE SERVICIOACTIVO"
                            >
                                <option value="">Seleccione</option>
                                <option value="DISPONIBLE">Disponible</option>
                                <option value="OCUPADO">Ocupado</option>
                                <option value="FUERA DE SERVICIO">Fuera de servicio</option>
                                <option value="MANTENIMIENTO">Mantenimiento </option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='ingresoD price' controlId="formAnio">
                            <Form.Label>Año</Form.Label>
                            <Form.Control
                                type="number"
                                value={anio}
                                onChange={(e) => setAnio(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='ingresoD price' controlId="formPrecio">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="$"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                   
                            />
                            {mostrarError && <h6 className="ErroresInput">El precio debe ser mayor a 5</h6>}
                        </Form.Group>

                    </Row>

                    <Row >
                        <Form.Group className=' fileinput' controlId="fileFotos">
                            <Form.Label>Sube una Imagen</Form.Label>
                            <Form.Control
                                type="file"
                                name='fotos'
                                onChange={(e) => setFotos(e.target.files[0])}
                                size="lg" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group yclassName='ingresoD' controlId="fileDetalles">
                            <Form.Label>Detalles del Auto</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder=""
                                value={detalles}
                                onChange={(e) => setDetalles(e.target.value)}
                                rows={3} />
                        </Form.Group>
                    </Row>

                    <Button variant="primary" onClick={crearAuto()}>
                        Registrar Auto
                    </Button>
                </Form>
            </div>
        </div>
    )
}
