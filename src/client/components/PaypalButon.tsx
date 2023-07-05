import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import swal from 'sweetalert2';

interface PaypalButtonInterface {
  totalValue: string;
  invoice: string;
}

const PaypalButton: React.FC<PaypalButtonInterface> = (props) => {
  const handlePaymentCapture = async (data: any, actions: any) => {
    const order = await actions.order?.capture();
    console.log('ORDEN:', order);

    // Mostrar la alerta de confirmación de pago
    swal.fire({
      title: '¡Pago confirmado!',
      text: 'El pago se ha realizado con éxito.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
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
