import React, { useState } from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = ({ 
  phoneNumber = "226XXXXXXXX", 
  message = "Bonjour RDO-BF ! J'aimerais en savoir plus sur le réseau." 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Popup de chat */}
      {isOpen && (
        <div className="wa-popup">
          <div className="wa-popup-header">
            <div className="wa-popup-avatar">
              <svg viewBox="0 0 32 32" width="24" height="24" fill="white">
                <path d="M16.004 2C8.28 2 2 8.28 2 16.004c0 2.46.64 4.77 1.76 6.78L2 30l7.42-1.94a14 14 0 0 0 6.58 1.68h.01c7.72 0 14-6.28 14-14S23.72 2 16.004 2z"/>
              </svg>
            </div>
            <div className="wa-popup-info">
              <strong>RDO-BF</strong>
              <span>Réseau des Opportunités du Burkina</span>
            </div>
            <button className="wa-popup-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="wa-popup-body">
            <div className="wa-popup-bubble">
              👋 Bonjour ! Comment pouvons-nous vous aider ?
            </div>
            <div className="wa-popup-bubble wa-popup-bubble-time">
              🕐 Répond généralement en quelques minutes
            </div>
          </div>

          <a 
            href={url} 
            target="_blank" 
            rel="noreferrer"
            className="wa-popup-btn"
          >
            💬 Démarrer la conversation
          </a>
        </div>
      )}

      {/* Bouton flottant */}
      <button 
        className="whatsapp-float" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contacter RDO-BF sur WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="32" height="32" fill="white">
          <path d="M16.004 2C8.28 2 2 8.28 2 16.004c0 2.46.64 4.77 1.76 6.78L2 30l7.42-1.94a14 14 0 0 0 6.58 1.68h.01c7.72 0 14-6.28 14-14S23.72 2 16.004 2zm0 25.6a11.6 11.6 0 0 1-5.9-1.62l-.42-.25-4.4 1.15 1.18-4.3-.28-.44A11.55 11.55 0 0 1 4.4 16c0-6.4 5.2-11.6 11.6-11.6S27.6 9.6 27.6 16s-5.2 11.6-11.6 11.6zm6.35-8.7c-.35-.17-2.06-1.02-2.38-1.13-.32-.12-.55-.17-.78.17-.23.35-.9 1.13-1.1 1.36-.2.23-.4.26-.75.09-.35-.17-1.48-.55-2.82-1.74-1.04-.93-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.6.17-.2.23-.35.35-.58.12-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.57-.28-.68-.56-.59-.78-.6l-.66-.01c-.23 0-.6.09-.92.43-.32.35-1.2 1.18-1.2 2.87s1.23 3.33 1.4 3.56c.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.14.66-.1 2.06-.84 2.35-1.65.29-.81.29-1.5.2-1.65-.09-.14-.32-.23-.67-.4z"/>
        </svg>
      </button>
    </>
  );
};

export default WhatsAppButton;