 
import { useNavigate} from 'react-router-dom'
import { BsPhoneVibrate, BsFillPinMapFill, BsEnvelopeAt} from 'react-icons/bs'
import '../styles/contactos.css'
export const ContactForm = () => {
    const history = useNavigate ();
    const navigateTo = (path) => {
        history(path);
    }

    return (
        <div className='contactoForm'>
            <div className="container-form">
                <div className="info-form">
                    <h2>Contáctanos</h2>
                    <p>Nos encantaría saber de ti. Si tienes alguna pregunta, comentario o sugerencia, por favor no dudes en ponerte en contacto con nosotros..</p>
                    <a href="#httphone" value='e'><i className="fa fa-phone"></i><BsPhoneVibrate style={{ color: 'black', fontSize: '35px', marginRight: '20px' }} /> +(593) 333-9649</a>
                    <a href="htts"><i className="fa fa-envelope"></i> <BsEnvelopeAt style={{ color: 'black', fontSize: '35px' , marginRight: '20px' }} /> teamRentaCar@gmail.com</a>
                    <a href="https://goo.gl/maps/sdjGAmyiyXNvBNgT6"><i className="fa fa-map-marked"></i> <BsFillPinMapFill style={{ color: 'black', fontSize: '35px' , marginRight: '20px' }} /> Riobamba - Ecuador</a>
                </div>
                <form action="#" autoComplete="off">
                    <input type="text" name="nombre" placeholder="Tu Nombre" className="campo" />
                    <input type="email" name="email" placeholder="Tu Email" className="campo" />
                    <input className="textarea"   type= 'textarea' placeholder="Tu Mensaje...">

                    </input>
                 <center>
                    <input  name="enviar" value="Enviar Mensaje" className="btn-enviar" />
                    <input name="enviar" value="Volver" className="btn-volver"  onClick={() => navigateTo('/cliente')}/>
                 </center>   
                </form>
            </div>

        </div>
    )
}
