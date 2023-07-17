import '../client/styles/Home.css'
import NavBar from './NavBar';
import { HomeClient } from '../client/components/HomeClient';

export const Inicio = () => {
    return (
        <div className='home-content'>
            <NavBar />
            <div className="main">
                <HomeClient/>
            </div>
        </div>
    );
};

