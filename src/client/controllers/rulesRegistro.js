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


