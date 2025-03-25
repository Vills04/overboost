"use client"
import React from 'react';
import { useCart } from '@/context/CartContext'; // Usar el hook useCart
import '../../styles/globals.css';
import CommentForm from '@/components/CommentForm'; // Importando CommentForm
import Link from 'next/link';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // Obtener estado y funciones del carrito

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Carrito
          </li>
        </ol>
      </nav>

      <div className="cart-page-container">
        <h2>Carrito de Compras</h2>
        <div className="cart-content">
          {/* Sección de productos en el carrito */}
          <div className="cart-items">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="cart-product">
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      />
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumen del carrito */}
          <div className="cart-summary">
            <h3>Resumen del Pedido</h3>
            <p>Subtotal: ${totalPrice}</p>
            <p>Envío: Gratis</p>
            <h4>Total: ${totalPrice}</h4>
            <button className="checkout-btn">Proceder al Pago</button>
          </div>
        </div>
        <CommentForm /> {/* Mostrando la sección de comentarios formulario */}
      </div>
    </div>
  );
};

export default CartPage;


