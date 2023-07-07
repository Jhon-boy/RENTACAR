import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Link } from 'react-router-dom';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function CustomizedBreadcrumbs() {
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
            <Link to='/cliente/misReservas'>
                  <StyledBreadcrumb
                    component="a"
                    href="#"
                    label="Mis reservas"
                    icon={<ContentPasteIcon fontSize="small" color='red' />}
                    className='iconsR'
                />
            </Link>
              
                <Link to='/cliente/misPagos'>
                       <StyledBreadcrumb 
                       className='iconsR'
                       component="a" href="#" 
                       icon={<AttachMoneyIcon fontSize="small" color='green'/>}
                       label="Mis pagos" /> 
                </Link>
            <Link to='/cliente/misReservas'>
                  <StyledBreadcrumb
                    label="Mis movimoentos"
                    deleteIcon={<ExpandMoreIcon />}
                    className='iconsR'
                />
            </Link>
              
            </Breadcrumbs>
        </div>
    );
}