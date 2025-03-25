import React from 'react';
import './Footer.css'; 

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <a href="index.html">
            <img src="/LOGO-P.png" alt="Logo" />
          </a>
        </div>
        <div className="footer-nav">
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/nosotros">Sobre nosotros</a></li>
            <li><a href="/legal">Aviso legal</a></li>
            <li><a href="/prox">Términos de servicio</a></li>
            <li><a href="/aviso-priv">Política de privacidad</a></li>
            <li><a href="/contacto">Contactanos</a></li>
            <li><a href="/mapa">Mapa del Sitio</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
