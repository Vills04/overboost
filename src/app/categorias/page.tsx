import React from 'react';
import Link from 'next/link';
import '../../styles/globals.css'; // Ajusta la ruta según tu estructura
import CommentForm from '@/components/CommentForm'; // Importando CommentForm

export default function Categorias() {
  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Categorías
          </li>
        </ol>
      </nav>

      {/* Sección de Productos */}
      <section className="content-section">
        <h2>Categorías</h2>
        <h3>Explora Nuestras Categorías Enfocadas En Los Mejores Pares</h3>
        
        <div className="categorias-list">
          <div className="categoria-item">
            <Link href="/producto/1" className="categoria-link">
              <div className="categoria-card">
                <h3>Basquetbol</h3>
                <p>Ver productos</p>
              </div>
            </Link>
          </div>
          <div className="categoria-item">
            <Link href="/producto/2" className="categoria-link">
              <div className="categoria-card">
                <h3>Running</h3>
                <p>Ver productos</p>
              </div>
            </Link>
          </div>
          <div className="categoria-item">
            <Link href="/producto/3" className="categoria-link">
              <div className="categoria-card">
                <h3>Casuales</h3>
                <p>Ver productos</p>
              </div>
            </Link>
          </div>
          <div className="categoria-item">
            <Link href="/producto/3" className="categoria-link">
              <div className="categoria-card">
                <h3>Moda</h3>
                <p>Ver productos</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Formulario de Comentarios */}
      <CommentForm /> {/* Mostrando la sección de comentarios */}
    </div>
  );
}
