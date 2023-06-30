/* eslint-disable react/prop-types */
import '../../styles/Card.css'
import { IMAGE } from '../../data/URL';

export const CardHistory = ({ cliente, autos, reservas }) => {
    return (
        <div className="card">
          <div className="avatar-container">
            <img src={cliente.foto} alt="Foto del cliente" className="avatar" />
          </div>
          <div className="info">
            <h3 className="nombre">{cliente.nombre} {cliente.apellido}</h3>
            <div className="car-info">
              <img src={`${IMAGE}/${cliente.fotos}`} alt="Foto del carro" className="car-avatar" />
              <div>
                <p className="auto">{autos.marca}</p>
                <p className="auto">{autos.modelo}</p>
                <p className="placas">Placas: {autos.placas}</p>
              </div>
            </div>
            <p className="fechas">{reservas.fecha_entrega} - {reservas.fecha_devolucion}</p>
            <p className="costo">Costo: {reservas.monto}</p>
          </div>
        </div>
      );
}
