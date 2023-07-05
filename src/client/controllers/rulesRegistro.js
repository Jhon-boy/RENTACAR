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
export const verificarApellido = (apellido) => {
    const apellidoP = apellido;
    if (apellidoP.length <= 2) {
        return false;
    }
    // Verificar si el nombre tiene letras repetidas más de 2 veces seguidas
    if (apellidoP.match(/([A-Za-z])\1{2,}/)) {
        return false;
    }

    // Verificar si el nombre contiene solo letras y espacios
    if (!apellidoP.match(/^[A-Za-z\s]+$/)) {
        return false;
    }

    if (!apellidoP || apellidoP.trim() === '') {
        return false;
    }

    // Verificar si el nombre tiene una longitud válida (entre 2 y 50 caracteres)
    if (apellidoP.length < 2 || apellidoP.length > 28) {
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


export const verificarCedula = (cedulaP) => {
    const cedula = cedulaP;
    if (cedula.length === 10) {
      //Obtenemos el digito de la region que son los dos primeros digitos
      var digito_region = cedula.substring(0, 2);
  
      //Pregunto si la region existe, Ecuador se divide en 24 regiones
      if (digito_region >= 1 && digito_region <= 24) {
        // Extraigo el último dígito
        var ultimo_digito = cedula.substring(9, 10);
  
        //Agrupo todos los pares y los sumo
        var pares =
          parseInt(cedula.substring(1, 2)) +
          parseInt(cedula.substring(3, 4)) +
          parseInt(cedula.substring(5, 6)) +
          parseInt(cedula.substring(7, 8));
  
        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        var numero1 = cedula.substring(0, 1);
        numero1 = numero1 * 2;
        if (numero1 > 9) {
          numero1 = numero1 - 9;
        }
  
        var numero3 = cedula.substring(2, 3);
        numero3 = numero3 * 2;
        if (numero3 > 9) {
          numero3 = numero3 - 9;
        }
  
        var numero5 = cedula.substring(4, 5);
        numero5 = numero5 * 2;
        if (numero5 > 9) {
          numero5 = numero5 - 9;
        }
  
        var numero7 = cedula.substring(6, 7);
        numero7 = numero7 * 2;
        if (numero7 > 9) {
          numero7 = numero7 - 9;
        }
  
        var numero9 = cedula.substring(8, 9);
        numero9 = numero9 * 2;
        if (numero9 > 9) {
          numero9 = numero9 - 9;
        }
  
        var impares = numero1 + numero3 + numero5 + numero7 + numero9;
  
        //Suma total
        var suma_total = pares + impares;
  
        //extraemos el primer dígito
        var primer_digito_suma = String(suma_total).substring(0, 1);
  
        //Obtenemos la decena inmediata
        var decena = (parseInt(primer_digito_suma) + 1) * 10;
  
        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el dígito validador
        var digito_validador = decena - suma_total;
  
        //Si el dígito validador es = a 10 toma el valor de 0
        if (digito_validador === 10) {
          digito_validador = 0;
        }
  
        //Validamos que el dígito validador sea igual al de la cédula
        if (digito_validador != ultimo_digito) {
          console.log('La cédula:' + cedula + ' es incorrecta');
          return false;
        }
      } else {
        // imprimimos en consola si la región no pertenece
        console.log('Esta cédula no pertenece a ninguna región');
        return false;
      }
    } else {
      //imprimimos en consola si la cédula tiene más o menos de 10 dígitos
      console.log('Esta cédula tiene menos de 10 dígitos');
      return false;
    }
  
    return true;
  };
  
  export const verificarContrasena = (contrasena) => {
    // Verificar si la contraseña tiene una longitud válida (entre 8 y 20 caracteres)
    if (contrasena.length < 8 || contrasena.length > 20) {
        return false;
    }

    // Verificar si la contraseña contiene al menos una letra mayúscula
    if (!/[A-Z]/.test(contrasena)) {
        return false;
    }

    // Verificar si la contraseña contiene al menos un carácter especial
    if (!/[^A-Za-z0-9]/.test(contrasena)) {
        return false;
    }

    return true;
};

  
  export const verificarCorreo = (correo) => {
    // Verificar si el correo electrónico tiene un formato válido
    const correoRegex = /^[^\s@]+@(gmail|hotmail)\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      return false;
    }
  
    // Realizar otras validaciones específicas para correos electrónicos oficiales si es necesario
  
    return true;
  };
  
  export const validarFechasLicencia = (fechaEmision, fechaCaducidad) => {
    const fechaActual = new Date();
    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaActual.getFullYear() - 5); // Restar 5 años a la fecha actual

    fechaEmision = new Date(fechaEmision); // Convertir fecha de emisión a objeto Date
    fechaCaducidad = new Date(fechaCaducidad); // Convertir fecha de caducidad a objeto Date

    // Verificar si las fechas de emisión y caducidad son objetos Date válidos
    if (isNaN(fechaEmision.getTime()) || isNaN(fechaCaducidad.getTime())) {
        return false;
    }

    // Verificar si la fecha de emisión está dentro del límite de 5 años desde la fecha actual
    if (fechaEmision > fechaActual || fechaEmision < fechaMinima) {
        return false;
    }

    // Verificar si la fecha de caducidad está dentro del rango de 5 años desde la fecha de emisión
    const fechaLimiteCaducidad = new Date(fechaEmision);
    fechaLimiteCaducidad.setFullYear(fechaLimiteCaducidad.getFullYear() + 5); // Sumar 5 años a la fecha de emisión

    if (fechaCaducidad > fechaLimiteCaducidad || fechaCaducidad < fechaEmision) {
        return false;
    }

    // Verificar si la fecha de emisión y la fecha de caducidad tienen un mínimo de separación de 5 años
    const fechaMinimaSeparacion = new Date(fechaEmision);
    fechaMinimaSeparacion.setFullYear(fechaMinimaSeparacion.getFullYear() + 5); // Sumar 5 años a la fecha de emisión

    if (fechaCaducidad < fechaMinimaSeparacion || fechaEmision.getFullYear() === fechaCaducidad.getFullYear()) {
        return false;
    }

    return true;
};

export const verificarExtensionFoto = (foto) => {
    const extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'];

    const extension = foto.split('.').pop().toLowerCase();

    if (extensionesValidas.includes(extension)) {
        return true;
    }
    
    return false;
};


