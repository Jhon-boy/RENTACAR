import '../../Home.css'
import '../../styles/Config.css'
import { useState } from 'react'
export const Config = () => {

    const [iva, setIVA] = useState('');
    const [errorIVA, setErrorIVA] = useState('');

    const [numDias, setNumeroDias] = useState('');
    const [errorNumeroDias, setErrorNumeroDias] = useState('');

    const [precioMinimo, setPrecioMinimo] = useState('');
    const [errorPrecioMinimo, setErrorPrecioMinimo] = useState('');


    const handleInputChange = (e, setter) => {
        const value = e.target.value.replace(/\D/g, ''); // Elimina cualquier carácter que no sea un número
        setter(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Realiza alguna acción con los valores ingresados, como enviarlos a una API o realizar un cálculo
        console.log('IVA:', iva);
        console.log('Número de días:', numDias);
        console.log('Precio mínimo:', precioMinimo);
    };
    const handleIVAChange = (e) => {
        const value = parseInt(e.target.value);

        if (value < 1 || value > 100) {
            setErrorIVA('El valor del IVA debe estar entre 0 y 100');
        } else {
            setErrorIVA('');
            setIVA(value);
        }
    };

    const handleNumeroDiasChange = (e) => {
        const value = parseInt(e.target.value);

        if (value < 0 || value > 365) {
            setErrorNumeroDias('El número de días debe ser un valor positivo');
        } else {
            setErrorNumeroDias('');
            setNumeroDias(value);
        }
    };

    const handlePrecioMinimoChange = (e) => {
        const value = parseInt(e.target.value);

        if (value < 0 || value > 20000) {
            setErrorPrecioMinimo('El precio mínimo debe ser un valor positivo');
        } else {
            setErrorPrecioMinimo('');
            setPrecioMinimo(value);
        }
    };

    return (
        <div className='page-content'>
            <div className='home-container'>
                <div className='Config'>
                    <h3>Configuracion de alquiler de Automoviles</h3>
                    <form className="formulario" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="iva">IVA por cada alquiler:</label>
                            <input
                                type="number"
                                id="iva"
                                value={iva}
                                onChange={handleIVAChange}
                            />
                        </div>
                        <div>
                            <h6 className="error">{errorIVA}</h6>
                        </div>

                        <div className="form-group">
                            <label htmlFor="numero-dias">Número de Días maximo de alquiler:</label>
                            <input
                                type="number"
                                id="numero-dias"
                                value={numDias}
                                onChange={handleNumeroDiasChange}
                            />
                            <div>
                                <h6 className="error">{errorNumeroDias}</h6>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="precioMinimo">Precio mínimo de alquiler:</label>
                            <input
                                type="number"
                                id="precio-minimo"
                                value={precioMinimo}
                                onChange={handlePrecioMinimoChange}
                            />
                            <div>
                                <h6 className="error">{errorPrecioMinimo}</h6>
                            </div>
                        </div>

                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div >
        </div >
    )
}
