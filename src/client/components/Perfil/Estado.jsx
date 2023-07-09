/* eslint-disable react/prop-types */

import { Tooltip, Typography } from '@mui/material/';
import { CheckCircle, Block, Pending } from '@mui/icons-material/';

export const Estado = ({ estado }) => {
    const renderIcon = () => {
        switch (estado) {
            case 'HABILITADO':
                return (
                    <Tooltip title="Estimado, su cuenta ha sido verificada">
                        <CheckCircle style={{ color: 'green' }} />
                    </Tooltip>
                );
            case 'NO HABILITADO':
                return (
                    <Tooltip title="Estimado, Su cuenta no se encuentra habilitado. Por favor actualizar sus datos o contactarse con el equipo  RENTA CAR">
                        <Block style={{ color: 'red' }} />
                    </Tooltip>
                );
            case 'PENDIENTE':
                return (
                    <Tooltip title="Estimado, su cuenta pronto sera revisado por nuestro Equipo Renta Car. De momento no puede realizar ninguna reserva">
                        <Pending style={{ color: 'orange' }} />
                    </Tooltip>
                );
            default:
                return null;
        }
    };

    return (
        <div>
        <Typography style={{ color: 'white' }}>
            {renderIcon()}
        </Typography>
            
        </div>
    )
}
