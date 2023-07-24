
const letrasProvinciaV = ['A', 'B', 'C', 'E', 'G', 'H', 'I', 'J', 'L', 'K', 'M', 'N', 'O', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const segundaLetraV = ['A', 'U', 'Z', 'M', 'E'];
const estadosV = ['MANTENIMIENTO', 'FUERA DE SERVICIO', 'DISPONIBLE', 'OCUPADO'];

const tipo = [
    'SEDAN',
    'COUPE',
    'CONVERTIBLE',
    'HATCHBACK',
    'STATION WAGON',
    'MINIVAN',
    'UTILITARIO',
    'LIMOSINA',
    'CAMIONETA',
    'FURGONETA DE PASAJEROS',
    'MICROBUS',
    'MINIBUS',
    'CAMIÓN LIGERO',
    'CAMIÓN MEDIANO',
    'CAMIÓN PESADO'
];

export const Formato = (placa) => {
    if (placa.length !== 8) {
        return false;
    }

    const letras = placa.substring(0, 3);
    const guion = placa.charAt(3);
    const numeros = placa.substring(4);

    // Verificar si las primeras 3 letras son letras
    if (!letras.match(/^[A-Z]+$/)) {
        console.log('LAS 3 PRMIMERAS LETRAS ESTAN MAL', letras)
        return false;
    }

    // Verificar si el cuarto caracter es un guion
    if (guion !== '-') {
        console.log('guion')
        return false;
    }

    // Verificar si los últimos 4 caracteres son números
    if (!numeros.match(/^[0-9]+$/)) {
        console.log('LAS 3 NUMEROS ESTAN MAL', numeros)
        return false;
    }

    return true;
}

export const PrimerLetra = (placa) => {
    const placaF = placa.toUpperCase();
    const letra = placaF.charAt(0);

    if (letrasProvinciaV.includes(letra)) {
        return true;
    }

    return false;
}

export const segundaLetra = (placa) => {
    const placaF = placa.toUpperCase();
    const letra2 = placaF.charAt(1);

    if (segundaLetraV.includes(letra2)) {
        return false;
    }

    return true;

}

export const estados = (estados) => {
    const estado = estados.toUpperCase();
    if (estadosV.includes(estado)) {
        return true;
    }
    return false;

}

export const verificarAnio = (anio) => {

    const anioActual = new Date().getFullYear();
    const anioIngresado = parseInt(anio);

    if (!Number.isInteger(anioIngresado) || anioIngresado < 1980 || anioIngresado > anioActual + 1) {
        return false;
    }

    return true;
}
export const verificarTipo = (tipoA) => {
    const tipoIngresado = tipoA.toUpperCase();
    if (tipo.includes(tipoIngresado)) {
      return true;
    }
    return false;
  };

export const verificarExtensionFoto = (foto) => {
  const extensionesValidas = ['jpg', 'jpeg', 'png'];

  const extension = foto.split('.').pop().toLowerCase();

  if (extensionesValidas.includes(extension)) {
    return true;
  }

  return false;
};

export const verificarPrecio = (precio) =>{

    const anioAux = parseInt(precio);
    if(isNaN(anioAux)){
        return false;
    }
    if(anioAux <=0 || anioAux > 10000){
        return false;
    }
    return true;
}
export const verificarPlaca = (placa) => {
    const esFormatoValido = Formato(placa);
    const esPrimerLetraValida = PrimerLetra(placa);
    const esSegundaLetraValida = segundaLetra(placa);
  
    return esFormatoValido && esPrimerLetraValida && esSegundaLetraValida;
  };
  export const  campoEstaVacio = (valor)  =>{
   if(valor != null || valor.length <= 1){
    return false
   }
    return true;
  }
