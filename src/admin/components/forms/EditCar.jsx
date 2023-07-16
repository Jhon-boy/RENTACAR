/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IMAGE } from '../../data/URL';
import { URL } from '../../data/URL';
//import '../../Home.css'
//import '../../styles/Autos.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2';

import { verificarPlaca, estados, verificarAnio, verificarExtensionFoto, verificarPrecio, verificarTipo } from '../../hooks/Autos';
import { editarAutoController, editarAutoFilesController } from '../../database/controller';

export const EditCar = () => {
  // eslint-disable-next-line no-unused-vars
  const [cars, setCars] = useState([]);
  const { id } = useParams();
  const [imageURL, setImageURL] = useState('');

  const [placas, setPlacas] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState(2024);
  const [precio, setPrecio] = useState(10);
  const [tipo, setTipo] = useState('');
  const [detalles, setDetalles] = useState('');
  const [fotos, setFotos] = useState();
  const [estado, setEstado] = useState('');

  const [esPlacaValida, setEsPlacaValida] = useState(true);
  const [esExtension, setExtension] = useState(true);
  const [esPrecioValida, setPrecioValida] = useState(true);
  const [esAnioValida, setAnioValida] = useState(true);
  const [esMarcaValida, setMarcaValida] = useState(true);
  const [esModeloValida, setModeloValida] = useState(true);
  const [esEstadoValida, setEstadoValida] = useState(true);
  const [esDetallesValida, setDetallesValida] = useState(true);
  const [esTipoValida, setTipoValida] = useState(true);
  const [cambioEstado, setCambioEstado] = useState(false);

  const [imageFile, setImageFile] = useState(null);

  // const [modelosAutos, setModelosAutos] = useState([]);

  //FUNCION DE NAVEGACION 
  const history = useNavigate();
  const navigateTo = (path) => {
    history(path);
  }

  const editAuto = async (e) => {
    if (esPlacaValida && esPrecioValida && esAnioValida && esMarcaValida && esModeloValida && esEstadoValida && esDetallesValida && esTipoValida) {
      e.preventDefault();

      if (placas === '' || marca === '' || modelo === '' || tipo === '' || anio === '' || estado === '' || precio === '' || detalles === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos vacíos ',
          text: 'Por favor, completa todos los campos antes de registrar el auto.',
        });
        return;
      }

      if (cambioEstado == true) {
        const formData = new FormData();
        formData.append('placas', placas);
        formData.append('marca', marca);
        formData.append('modelo', modelo);
        formData.append('tipo', tipo);
        formData.append('anio', anio);
        formData.append('estado', estado);
        formData.append('precio', precio);
        formData.append('detalles', detalles);

        if (fotos instanceof File) {
          formData.append('fotos', fotos);
        }

        try {
          await editarAutoController(id, formData);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'EDIT EXITOSO',
            showConfirmButton: false,
            timer: 1500
          })
          history(`/EditCar/${id}`);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Algo Salio mal',
            text: 'Error: ' + error.message,
          });
        }
      }

      if (cambioEstado == false) {
        cars.placas = e.target.placas.value;
        cars.marca = e.target.marca.value;
        cars.modelo = e.target.modelo.value;
        cars.tipo = e.target.tipo.value;
        cars.anio = e.target.anio.value;
        cars.estado = e.target.estado.value;
        cars.precio = e.target.precio.value;
        cars.detalles = e.target.detalles.value;
        try {
          await editarAutoFilesController(id, cars);
          history(`/EditCar/${id}`);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Algo Salio mal',
            text: 'Error: ' + error.message,
          });
        }
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Valores Incorrectos',
        text: 'Por favor, completacon informacion veridica',
      });
    }

  }

  React.useEffect(() => {
    fetch(`${URL}/autos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Aquí asignamos los valores recibidos a las variables correspondientes
        setPlacas(data.placas);
        setMarca(data.marca);
        setModelo(data.modelo);
        setAnio(data.anio);
        setPrecio(data.precio);
        setTipo(data.tipo);
        setDetalles(data.detalles);
        setFotos(data.fotos);
        setEstado(data.estado);
        setImageURL(data.fotos);
        setCars(data);
        setCambioEstado(false);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className='page-content'>
      <div className='home-container'>
        editar Informacion del Automovil
        <div className='EditCar'>
          <div className="ContenidoAuto">
            <Form onSubmit={editAuto} encType='multipart/form-data' className="formulario" >
              <div className='editAuto'>
                <div className='portadaImagen'>
                  <Form.Group className='' controlId="fileFotos">
                    <label htmlFor="images" className="drop-container2">
                      <input
                        required
                        type="file"
                        name="fotos"
                        id="images"
                        onChange={(e) => {
                          const archivo = e.target.files[0];
                          setFotos(e.target.files[0]);
                          setExtension(verificarExtensionFoto(archivo.name));
                          setCambioEstado(true)
                          const file = e.target.files[0];
                          const reader = new FileReader();

                          reader.onload = () => {
                            setImageURL(reader.result);
                          };

                          if (file) {
                            reader.readAsDataURL(file);
                            setImageFile(file);
                          }
                        }}
                        size="lg"
                      >
                      </input>
                      {imageFile == null ? imageURL && <img src={`${IMAGE}/${imageURL}`} alt="Imagen actual" className='AutoPortada' />
                        : imageURL && <img src={imageURL} alt="Imagen actual" className='AutoPortada' />}

                    </label>

                    {!esExtension && (
                      <div>
                        <h6 className="ErroresInput fotoError">* Solo se aceptan fotos tipo: png, jpg, jpeg</h6>
                      </div>
                    )}
                  </Form.Group>


                </div>

                <div className='InfoAuto'>
                  <Row className="mb-3">
                    <Form.Group className='ingresoD' controlId="forMarca">
                      <Form.Label>Marca</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Mazda"
                        value={marca}
                        onChange={(e) => {
                          setMarca(e.target.value)
                          setMarcaValida(e.target.value.trim() !== '')
                        }}
                        onBlur={() => setMarcaValida(marca.trim() !== '')}
                        required
                      />
                      {!esMarcaValida && (
                        <div>
                          <h6 className="ErroresInput">* Campo obligatorio</h6>
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className='ingresoD' controlId="formModelo">
                      <Form.Label>Modelo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Raptor"
                        value={modelo}
                        onChange={(e) => {
                          setModelo(e.target.value);
                          setModeloValida(e.target.value.trim() !== '')
                        }}
                        onBlur={() => setModeloValida(modelo.trim() !== '')}
                        required
                      />
                      {!esModeloValida && (
                        <div>
                          <h6 className="ErroresInput">* Campo obligatorio</h6>
                        </div>

                      )}
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group className='ingresoD' controlId="formPlacas">
                      <Form.Label>Placas</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="CHW-2015"
                        value={placas}
                        onChange={(e) => {
                          const nuevaPlaca = e.target.value;
                          setPlacas(e.target.value);
                          setEsPlacaValida(verificarPlaca(nuevaPlaca));
                        }}

                      />
                      {!esPlacaValida && (
                        <div>
                          <h6 className="ErroresInput">Formato invalido de placas</h6>
                          <h6 className="SucessInput">Ejemplo: CHW-4587</h6>
                        </div>

                      )}
                    </Form.Group>

                    <Form.Group className='ingresoD' controlId="formTipo">
                      <Form.Label>Tipo</Form.Label>
                      <Form.Select
                        required
                        as="select"
                        placeholder="Ingrese el Tipo"
                        value={tipo}
                        onChange={(e) => {
                          const tipoAux = e.target.value;
                          setTipo(e.target.value)

                          setTipoValida(verificarTipo(tipoAux));
                        }}
                        defaultValue="CAMIONETA"
                      >
                        <option value=""></option>
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
                      {!esTipoValida && (
                        <div>
                          <h6 className="ErroresInput">* Campo obligatorio</h6>
                          <h6 className="SucessInput">- Seleccione una</h6>
                        </div>

                      )}
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group yclassName='ingresoD' controlId="fileDetalles">
                      <Form.Label>Detalles del Auto</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        placeholder=""
                        value={detalles}
                        onChange={(e) => {
                          setDetalles(e.target.value)
                          setDetallesValida(e.target.value.trim() !== '')
                        }}

                        onBlur={() => setDetallesValida(detalles.trim() !== '')}

                        rows={3} />
                      {!esDetallesValida && (
                        <div>
                          <h6 className="ErroresInput fotoError">* Campo obligatorio</h6>
                        </div>
                      )}
                    </Form.Group>

                  </Row>
                </div>

              </div>
              <Row className="mb-3">
                <Form.Group className='ingresoD' controlId="formEstado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    required
                    type="text"
                    placeholder="Ingrese el Estado"
                    value={estado}
                    onChange={(e) => {
                      const estadoAux = e.target.value;
                      setEstado(e.target.value)
                      setEstadoValida(estados(estadoAux));
                    }}
                    defaultValue="INFUERA DE SERVICIOACTIVO"
                  >
                    <option value=""></option>
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="OCUPADO">Ocupado</option>
                    <option value="FUERA DE SERVICIO">Fuera de servicio</option>
                    <option value="MANTENIMIENTO">Mantenimiento </option>
                  </Form.Select>
                  {!esEstadoValida && (
                    <div>
                      <h6 className="ErroresInput">* Campo obligatorio: </h6>
                      <h6 className="SucessInput">- Seleccione una</h6>
                    </div>
                  )}
                </Form.Group>
                <Form.Group className='ingresoD price' controlId="formAnio">
                  <Form.Label>Año</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min={1960}
                    max={2024}
                    value={anio}
                    onChange={(e) => {
                      const anioAux = e.target.value;
                      setAnio(e.target.value)
                      setAnioValida(verificarAnio(anioAux))
                    }}
                  />
                  {!esAnioValida && (
                    <div>
                      <h6 className="ErroresInput">*Campo obligatorio: Año invalido</h6>
                    </div>

                  )}
                </Form.Group>

                <Form.Group className='ingresoD price' controlId="formPrecio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="$"
                    value={precio}
                    onChange={(e) => {
                      const precioAux = e.target.value;
                      setPrecio(e.target.value)
                      setPrecioValida(verificarPrecio(precioAux));
                    }}

                  />
                  {!esPrecioValida && <h6 className="ErroresInput">* Campo obligatorio: Precio invalido</h6>}
                </Form.Group>

              </Row>

              <div className='btns'>
                <Button variant="primary" onClick={editAuto}>
                  Completar Edit del  Auto
                </Button>
                <Button variant="primary" >
                  Cancelar Edit
                </Button>
              </div>


            </Form>

          </div>
        </div>
      </div>
    </div>
  )
}
