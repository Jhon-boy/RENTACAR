
import '../styles/Footer.css'
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';


export default function Footer() {
    return (
        <div className='footer-container'>
            <footer className='container-footer'>
                <div className="informacion">
                    <div className="colum1">
                        <h6 className="nombre-empresa">
                            <b>R</b>enta<b>C</b>ar
                        </h6>
                        <p className='frase2'>
                            Alquila autos de calidad a precios accesibles.
                        </p>
                        <a href="#" className="me-4 text-reset">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="me-4 text-reset">
                            <FaTwitter />
                        </a>
                        <a href="#" className="me-4 text-reset">
                            <FaGoogle />
                        </a>
                        <a href="#" className="me-4 text-reset">
                            <FaInstagram />
                        </a>
                        <a href="#" className="me-4 text-reset">
                            <FaLinkedin />
                        </a>
                        <a href="#" className="me-4 text-reset">
                            <FaGithub />
                        </a>
                    </div>
                    <div className="colum2">
                        <h6 className="text-uppercase">Información</h6>
                        <p>
                            <a href="#!" className="text-reset">
                                ¿Quienes somos?
                            </a>
                        </p>
                        <p>
                            <a href="#!" className="text-reset">
                                Nuestra Mision
                            </a>
                        </p>
                        <p>
                            <a href="#!" className="text-reset">
                                Nuestra Vision
                            </a>
                        </p>
                        <p>
                            <a href="#!" className="text-reset">
                                ¿Porque nosotros?
                            </a>
                        </p>
                    </div>
                    <div className="colum3">
                        <h6 className="text-uppercase">Ubicación</h6>
                        <p>
                            <a  className="text-reset">
                                Riobamba, Chimborazo, Ecuador
                            </a>
                        </p>
                        <p>
                            <a  className="text-reset">
                                Telf. 0956461616
                            </a>
                        </p>
                        <p>
                            <a className="text-reset">
                                Telf. 3251564165
                            </a>
                        </p>
                        <p>
                            <a href="#!" className="text-reset">
                                Help
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
