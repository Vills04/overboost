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
            Hombres
          </li>
        </ol>
      </nav>

      {/* Sección de Productos */}
      <section className="content-section">
        <h2>Hombres</h2>
        <h3>Explora Nuestros Productos Enfocados En Los Mejores Hombres</h3>
        
        <div className="content-container">
          <div className="content-box">
            <img src="/SHOES/Rigorer_1.png" alt="Kobe VIII" />
            <h3>Rigorer 1</h3>
            <h5>$4,600</h5>
            <Link href="/productos/1" className="btn-ver-mas">Ver más</Link>
          </div>
          <div className="content-box">
            <img src="/SHOES/Lebron_22.png" alt="Lebron XXII" />
            <h3>Lebron XXII</h3>
            <h5>$3,600</h5>
            <Link href="/producto/2" className="btn-ver-mas">Ver más</Link>
          </div>
          <div className="content-box">
            <img src="/SHOES/Nike_Rival.png" alt="Trae Young 3 Low" />
            <h3>Nike Rival</h3>
            <h5>$2,100</h5>
            <Link href="/producto/3" className="btn-ver-mas">Ver más</Link>
          </div>
          <div className="content-box">
            <img src="/SHOES/Nike_Vomero.png" alt="Trae Young 3 Low" />
            <h3>Nike Vomero</h3>
            <h5>$2,900</h5>
            <Link href="/producto/3" className="btn-ver-mas">Ver más</Link>
          </div>
        </div>
      </section>
      <CommentForm /> {/* Mostrando la sección de comentarios formulario */}
    </div>
  );
}

