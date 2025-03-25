"use client"
// src/components/BestSellers.tsx
import React from 'react';
import { useCart } from '@/context/CartContext'; // Importar el hook useCart
import styles from './BestSellers.module.css';

const BestSellers: React.FC = () => {
  const { addToCart } = useCart(); // Obtener la función addToCart desde el contexto

  const products = [
    { id: '1', name: 'Anthony Edwards 1 Low', price: 7000, image: 'SHOES/Ad_1.png' },
    { id: '2', name: 'Nike Court Vision Low', price: 3200, image: 'SHOES/Nike_Court.png' },
    { id: '3', name: 'Kobe VIII', price: 4600, image: 'SHOES/Kobe_8.png' },
    { id: '4', name: 'Trae Young 3 Low', price: 5900, image: 'SHOES/Ty_3.png' },
  ];

  const handleAddToCart = (product: { id: string; name: string; price: number; image: string }) => {
    const cartItem = {
      ...product, // Copiar las propiedades del producto
      quantity: 1, // Agregar la cantidad (1 por defecto)
    };
    addToCart(cartItem); // Llamar a la función para agregar al carrito
  };

  return (
    <section className={styles['content-section']}>
      <h2>Lo más Vendido</h2>
      <div className={styles['content-container']}>
        {products.map(product => (
          <div key={product.id} className={styles['content-box']}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <h5>${product.price}</h5>
            <button 
              className={styles['btn-ver-mas']} 
              onClick={() => handleAddToCart(product)} // Agregar al carrito
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;



