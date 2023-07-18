import { useEffect } from 'react';

const ChatFuelScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = '64a42eb3dbb08e674f8c0d37';
    script.src = 'https://dashboard.chatfuel.com/integration/entry-point.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Limpiar el script al desmontar el componente
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default ChatFuelScript;
