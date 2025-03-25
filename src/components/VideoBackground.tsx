import React from 'react';
import styles from './VideoBackground.module.css';

const VideoBackground: React.FC = () => {
  return (
    <div className={styles.content}>
      <video autoPlay loop muted playsInline className={styles.videoFondo}>
        <source src="SHAI_001.mp4" type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
      <div className={styles.textoPrincipal}>
        <h6>#1 Trending</h6>
        <img src="SHAI001_LOGO.png" alt="SHAI001" />
        <p>
          Llega el Converse SHAI 001, la esencia del estilo y la innovación. Diseñado por Shai Gilgeous-Alexander, 
          este calzado redefine la versatilidad con su exclusivo sistema de cremallera y un diseño inspirado en 
          la confianza y la creatividad del juego. Máximo rendimiento, comodidad superior y un look único, dentro y fuera de la cancha.
        </p>
        <a href="prox.html">Información</a>
        <a href="prox.html" className={styles.cta}>Apartar</a>
      </div>
    </div>
  );
};

export default VideoBackground;
