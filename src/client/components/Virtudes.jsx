import React from 'react'
import '../styles/Ventajas.css'
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';
import MonetizationOnSharpIcon from '@mui/icons-material/MonetizationOnSharp';
import HttpsSharpIcon from '@mui/icons-material/HttpsSharp';
import DriveEtaSharpIcon from '@mui/icons-material/DriveEtaSharp';

export default function Virtudes() {
    return (
        <div className='ventajas'>
            <div className="title">
                <h2 className="title-ven">
                    ¿POR QUE ELEGIR RENTACAR?
                </h2>
            </div>
            <div className="container-ventajas">
                <div className="item1">
                    <div className='icon-ven'>
                        <LanguageSharpIcon />
                    </div>
                    <div className="text-ven">
                        Experiencia y presencia mundial
                    </div>
                    <div className="info-vent">
                        Tenemos más de 40 años de experiencia en el mercado Ecuatoriano. RentaCar cuenta con oficinas en más de 140 países.
                    </div>
                </div>
                <div className="item1">
                    <div className='icon-ven'>
                        <MonetizationOnSharpIcon />
                    </div>
                    <div className="text-ven">
                        El mejor precio garantizado
                    </div>
                    <div className="info-vent">
                        Obtenga el mejor precio cuando reserve directamente en www.rentacar.com. Cambie o cancele su reserva en cualquier momento.
                    </div>
                </div>
                <div className="item1">
                    <div className='icon-ven'>
                        <HttpsSharpIcon />
                    </div>
                    <div className="text-ven">
                        "Contacto cero" al alquilar un vehículo
                    </div>
                    <div className="info-vent">
                        Generamos y firmamos contratos de alquiler remota y digitalmente. Ofrecemos servicio de entrega de vehículos a domicilio, sin costo. La tecnología es nuestro mejor aliado.
                    </div>
                </div>
                <div className="item1">
                    <div className='icon-ven'>
                        <DriveEtaSharpIcon />
                    </div>
                    <div className="text-ven">
                        Vehículos sanitizados
                    </div>
                    <div className="info-vent">
                        Nuestros vehículos son completamente sanitizados y seguimos todos los protocolos de bioseguridad. Su seguridad es nuestra prioridad número uno.
                    </div>
                </div>
            </div>
        </div>
    )
}
