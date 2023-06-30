import { useParams } from 'react-router-dom';
import '../../Home.css';

export const Historial = () => {
    const {id} = useParams();
    return (
        <div className='page-content'>
            <div className='home-container'>
            HOLAA AQUI TE DAR EL ID: {id}
            </div>
        </div>
    )
}
