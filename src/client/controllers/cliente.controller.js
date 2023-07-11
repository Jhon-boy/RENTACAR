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

export const verificarCedula = (cedulaP) => {
    const cedula = cedulaP;

    if (cedula.length !== 10) {
        console.log('Esta cédula tiene menos de 10 dígitos');
        return false;
    }

    const digitoRegion = parseInt(cedula.substring(0, 2));

    if (digitoRegion < 1 || digitoRegion > 24) {
        console.log('Esta cédula no pertenece a ninguna región');
        return false;
    }

    const ultimoDigito = parseInt(cedula.substring(9, 10));

    let pares = 0;
    let impares = 0;

    for (let i = 1; i < 9; i += 2) {
        const digito = parseInt(cedula.charAt(i));
        impares += digito * 2 > 9 ? digito * 2 - 9 : digito * 2;
    }

    for (let i = 0; i < 9; i += 2) {
        pares += parseInt(cedula.charAt(i));
    }

    const sumaTotal = pares + impares;
    const primerDigitoSuma = parseInt(String(sumaTotal).charAt(0));
    const decena = (primerDigitoSuma + 1) * 10;
    let digitoValidador = decena - sumaTotal;

    if (digitoValidador === 10) {
        digitoValidador = 0;
    }

    if (digitoValidador !== ultimoDigito) {
        console.log('La cédula ' + cedula + ' es incorrecta');
        return false;
    }

    return true;
};

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