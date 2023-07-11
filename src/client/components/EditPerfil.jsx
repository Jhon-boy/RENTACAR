/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from 'react';
import '../styles/Perfil.css'
import { CardLicencia } from './Perfil/CardLicencia.jsx';
import { Perfilc } from './Perfil/Perfilc.jsx';
import { InfoC } from './Perfil/InfoC.jsx';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

export const EditPerfil = (props) => {
    const [clienteData, setClienteData] = useState(props.cliente);

    return (
        <div>
            <div className='Perfil-Container'>
                <div className="home-container">
                <h3>Informacion de su Cuenta</h3>
                <Divider textAlign="left">
                    <Chip   color="primary"     label="Sus credenciales" />
                </Divider>
                    <Perfilc id={props.id} />
                </div>
                <div className='home-container'>
                <Divider textAlign="left">
                    <Chip    color="primary" label="Informacíon personal de su Cuenta" />
                </Divider>
                    <InfoC cliente={props.cliente} />
                </div>

                <div className='home-container'>
                <Divider textAlign="left">
                    <Chip   color="primary" label="Informacion de su licencia" />
                </Divider>
                    <CardLicencia id_licencia={clienteData.id_licencia} />
                </div>
            </div>


        </div>

    )
}
