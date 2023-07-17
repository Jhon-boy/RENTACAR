/* eslint-disable react/prop-types */
//import '../styles/SliderBarClient.css'
import { Link } from 'react-router-dom'

export const SliderBar = ({ activeTab, setActiveTab }) => {
    return (
        <div className="slider-bar">
            <Link to={`/Clientes`}>
                <div
                    className={`slider-item ${activeTab === 'lista' ? 'active' : ''}`}
                    onClick={() => setActiveTab('lista')}
                >
                    Listado Clientes
                </div>
            </Link>
            <Link to={`/CardClient`}>
                <div
                    className={`slider-item ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    Perfil de los clientes
                </div>
            </Link>

            <Link to={`/clientesPending`}>
                 <div
                className={`slider-item ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}>
                Clientes Pendientes
            </div>
            </Link>
           <Link to={`/clientesNo`}>
             <div
                className={`slider-item ${activeTab === 'No' ? 'active' : ''}`}
                onClick={() => setActiveTab('No')}
            >
                Clientes  No Habilitados
            </div>
           </Link>
           
        </div>
    )
}
