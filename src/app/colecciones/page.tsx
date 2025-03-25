import React from 'react';
import Link from 'next/link';
import '../../styles/globals.css'; // Ajusta la ruta según tu estructura
import CommentForm from '@/components/CommentForm'; // Importando CommentForm

export default function Hombres() {
  // Simulamos las colecciones
  const collections = [
    { id: '1', name: 'Curry' },
    { id: '2', name: 'Lebron' },
    { id: '3', name: 'Kobe' },
    { id: '4', name: 'Jordan' },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Colecciones
          </li>
        </ol>
      </nav>

      {/* Sección de Colecciones */}
      <section className="content-section">
        <h2>Colecciones</h2>
        <h3>Explora Nuestras Colecciones Enfocadas En Las Mejores Disciplinas</h3>
        
        <div className="colecciones-list">
          {collections.map((collection) => (
            <div key={collection.id} className="coleccion-item">
              <Link href={`/colecciones/${collection.id}`} className="coleccion-link">
                <div className="coleccion-card">
                  <h3>{collection.name}</h3>
                  <p>Ver productos</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>


      {/* Formulario de Comentarios */}
      <CommentForm /> {/* Mostrando la sección de comentarios */}
    </div>
  );
}
