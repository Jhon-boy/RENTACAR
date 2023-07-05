import React, { useEffect } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import swal from 'sweetalert2';
import { CompletarPago } from '../../admin/database/Pagos.Controller';
import { crearHistorial } from '../../admin/database/History.Controller';
import { CambioStadoAuto } from '../../admin/database/controller';
import { URL } from '../data/URL';
import axios from 'axios';


interface PaypalButtonInterface {
  totalValue: string;
  invoice: string;
  id_auto: string;
  id_cliente: string;
}

interface HistorialInterface {
  fecha_renta: string;
  comentario: string;
  id_cliente: string;
  id_pago?: string;
}

const PaypalButton: React.FC<PaypalButtonInterface> = (props) => {
  const handlePaymentCapture = async (data: any, actions: any) => {
    const fechaActual = new Date();

    // Obtiene los componentes de la fecha
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por eso se suma 1
    const dia = fechaActual.getDate();

    const pagos = {
      fecha_pago: `${año}-${mes}-${dia}`,
      tipo: 'PAYPAL',
      monto: props.totalValue,
      id_cliente: props.id_cliente,
      id_auto: props.id_auto,
    };

    const historial: HistorialInterface = {
      id_cliente: props.id_cliente,
      fecha_renta: `${año}-${mes}-${dia}`,
      comentario: 'REALIZADO POR PAYPAL',
    };

    try {
      const order = await actions.order?.capture();
      console.log('ORDEN APROBADO:', order);

      await CompletarPago(pagos);
      await CambioStadoAuto(props.id_auto, 'OCUPADO');

      const pagosResponse = await axios.get(`${URL}/pagos`);
      const pagosData = pagosResponse.data;

      // Obtener el id_pago más alto
      const maxIdPago = Math.max(...pagosData.map((pago: any) => pago.id_pago));

      historial.id_pago = maxIdPago.toString();
      console.log(historial);
      await crearHistorial(historial);
      // Mostrar la alerta de confirmación de pago
      swal.fire({
        title: '¡Pago confirmado!',
        text: 'El pago se ha realizado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: props.invoice,
              amount: {
                value: props.totalValue,
              },
            },
          ],
        });
      }}
      onApprove={handlePaymentCapture}
    />
  );
};

export default PaypalButton;