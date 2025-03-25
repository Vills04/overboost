import React from 'react';
import { useRouter } from 'next/router';
import { Collection } from './types'; // Asegúrate de importar los tipos
import Link from 'next/link';


export default function CollectionPage() {
  const router = useRouter();
  const { id } = router.query; // Obtener el id de la URL

  // Simulando que obtienes una colección específica
  const collections: Collection[] = [
    {
      id: '1',
      name: 'Curry',
      products: [
        { id: '1', name: 'Curry 8', imageUrl: '/shoes/curry8.png', price: '$150' },
        { id: '2', name: 'Curry 7', imageUrl: '/shoes/curry7.png', price: '$120' },
      ],
    },
    {
      id: '2',
      name: 'Lebron',
      products: [
        { id: '3', name: 'Lebron 22', imageUrl: '/shoes/lebron22.png', price: '$200' },
        { id: '4', name: 'Lebron 21', imageUrl: '/shoes/lebron21.png', price: '$180' },
      ],
    },
    // Más colecciones...
  ];

  // Encontrar la colección actual por ID
  const collection = collections.find((col) => col.id === id);

  if (!collection) {
    return <div>Colección no encontrada</div>; // Caso de que no se encuentre la colección
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/colecciones">Colecciones</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {collection.name}
          </li>
        </ol>
      </nav>

      {/* Sección de Productos */}
      <section className="content-section">
        <h2>{collection.name}</h2>
        <h3>Explora los productos de esta colección</h3>
        <div className="content-container">
          {collection.products.map((product) => (
            <div key={product.id} className="content-box">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <h5>{product.price}</h5>
              <Link href={`/producto/${product.id}`} className="btn-ver-mas">
                Ver más
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

