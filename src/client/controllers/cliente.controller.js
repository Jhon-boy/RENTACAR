import moment from 'moment';

export const validarCorreo = (correo) => {
    // Validar el correo electrónico
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        console.log("El correo electrónico no es válido.");
        return false;
    }

    return true;
}

export const validarContraseña = (contraseña) => {

    // Validar la contraseña
    if (contraseña.length < 8) {
        console.log("La contraseña debe tener al menos 8 caracteres.");
        return false;
    }

    if (!/[a-z]/.test(contraseña)) {
        console.log("La contraseña debe contener al menos una letra minúscula.");
        return false;
    }

    if (!/[A-Z]/.test(contraseña)) {
        console.log("La contraseña debe contener al menos una letra mayúscula.");
        return false;
    }

    if (!/[0-9]/.test(contraseña)) {
        console.log("La contraseña debe contener al menos un dígito.");
        return false;
    }
    return true;
}


export const contrasenasValidadas = (valor1, valor2) => {
    return valor1 === valor2;
}


export const verificarCedula = (cedula) => {
    var cad = cedula.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
        for (let i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                let aux = cad.charAt(i) * 2;
                if (aux > 9) aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }
        total = total % 10 ? 10 - total % 10 : 0;

        if (cad.charAt(longitud - 1) == total) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export const verificarNombre = (nombre) => {
    const nombreP = nombre;
    if (nombreP.length <= 2) {
        return false;
    }
    // Verificar si el nombre tiene letras repetidas más de 2 veces seguidas
    if (nombreP.match(/([A-Za-z])\1{2,}/)) {
        return false;
    }

    // Verificar si el nombre contiene solo letras y espacios
    if (!nombreP.match(/^[A-Za-z\s]+$/)) {
        return false;
    }

    if (!nombreP || nombreP.trim() === '') {
        return false;
    }

    // Verificar si el nombre tiene una longitud válida (entre 2 y 50 caracteres)
    if (nombreP.length < 2 || nombreP.length > 28) {
        return false;
    }


    return true;
}

export const verificarGenero = (genero) => {
    const generoV = ['MASCULINO', 'FEMENINO', 'OTRO'];

    const generoP = genero.toUpperCase();

    if (!generoV.includes(generoP)) {
        return false;
    }
    return true;
}

export const verificarExtensionFoto = (foto) => {
    const extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'];

    const extension = foto.split('.').pop().toLowerCase();

    if (extensionesValidas.includes(extension)) {
        return true;
    }

    return false;
};

//------------------------ LICENCIA ----------------------------------------------------------------

export const verificarFechas = (fecha_recepcion) => {
    const fechaActual = moment();
    const fechaRecepcion = moment(fecha_recepcion);

    const diferenciaDias = fechaRecepcion.diff(fechaActual, 'days');

    if (!(diferenciaDias >= 15)) {
        console.log('NO SE ADMITE LICENCIAS CADUCADAS :(');
        return false;
    }

    return true;
};


export const verificarEstado = (estado) => {
    return typeof estado === 'boolean';
};


export const verificarCategorias = (categoria) => {
    const categories = ['B', 'C', 'D', 'E', 'C1', 'D1']
    const categoriAux = categoria.toUpperCase();

    return categories.includes(categoriAux);
}

export const verificarLicencias = (licencia) => {
    // Verificar que la licencia tenga 10 dígitos
    return /^\d{10}$/.test(licencia);
};