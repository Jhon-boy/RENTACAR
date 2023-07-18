import { useEffect } from 'react';

const TidioChat = () => {
  useEffect(() => {
    const tidioScript = document.createElement('script');
    tidioScript.src = '//code.tidio.co/p6yk7lwuoc0lvkkscbcfuiggnqvwdn0d.js';
    tidioScript.async = true;
    document.body.appendChild(tidioScript);

    return () => {
      document.body.removeChild(tidioScript);
    };
  }, []);

  return null;
};

export default TidioChat;
