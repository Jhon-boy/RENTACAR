/* eslint-disable react/prop-types */

import '../styles/ChatM.css';

const WhatsAppChatButton = ({ destinationURL }) => {
  const redirectToDestination = () => {
    window.open(destinationURL, '_blank');
  };

  return (
    <div className="chat-button-messenger" onClick={redirectToDestination}>
      {/* Puedes agregar un ícono o texto aquí si lo deseas */}
      <span className="chat-icon-messenger" role="img" aria-label="Messenger">
        💬
      </span>
    </div>
  );
};

export default WhatsAppChatButton;
