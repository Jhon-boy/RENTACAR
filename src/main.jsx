
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PayPalScriptProvider
      options={{
        "client-id":  'AVSiAR4rToxlmy_yobSO9-8SNwBJi9a32_IxKG6GWluUtphYLsvVc8_Lu3BCeO6-5nhqwlTI7D_UCRIr'
      }}
    >
      <App />
    </PayPalScriptProvider>
  </BrowserRouter>

)
