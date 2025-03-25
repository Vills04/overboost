import React from 'react';
import Link from 'next/link';
import '../../styles/globals.css'; // Ajusta la ruta según tu estructura
import CommentForm from '@/components/CommentForm'; // Importando CommentForm

export default function Hombres() {
  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Mujeres
          </li>
        </ol>
      </nav>

      {/* Sección de Productos */}
      <section className="content-section">
        <h2>Mujeres</h2>
        <h3>Explora Nuestros Productos Enfocados En Las Mejores Mujeres</h3>
        
        <div className="content-container">
          <div className="content-box">
            <img src="/SHOES/NikeAirMax90.png" alt="Kobe VIII" />
            <h3>Nike Air Max 90</h3>
            <h5>$3,200</h5>
            <Link href="/productos/1" className="btn-ver-mas">Ver más</Link>
          </div>
          <div className="content-box">
            <img src="/SHOES/NikeV2KRun.png" alt="Lebron XXII" />
            <h3>Nike V2K Run</h3>
            <h5>$3,700</h5>
            <Link href="/producto/2" className="btn-ver-mas">Ver más</Link>
          </div>
          <div className="content-box">
            <img src="/SHOES/JordanSpizike.png" alt="Trae Young 3 Low" />
            <h3>Jordan Spizike</h3>
            <h5>$5,300</h5>
            <Link href="/producto/3" className="btn-ver-mas">Ver más</Link>
          </div>
        </div>
      </section>
      <CommentForm /> {/* Mostrando la sección de comentarios formulario */}
    </div>
  );
}