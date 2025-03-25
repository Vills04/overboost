"use client"; // Indicamos que es un componente de cliente
import React, { useState } from 'react';
import styles from './CommentForm.module.css';

// Expresión regular para validar un email que termine en .com
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com)$/;

interface CommentFormState {
  email: string;
  comment: string;
  error: string;
  successMessage: string;
}

const CommentForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación del email
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email válido que termine en .com.');
      return;
    }

    // Limpiar errores antes de enviar
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, comentario: comment }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Comentario enviado exitosamente.');
        setEmail('');
        setComment('');
      } else {
        setError(data.message || 'Hubo un problema al enviar el comentario.');
      }
    } catch (error) {
      setError('Hubo un problema con la solicitud.');
      console.error(error);
    }
  };

  return (
    <section className={styles.commentSection}>
      <h2>Deja tu Comentario</h2>
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Tu Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email"
            required
          />
          {/* Mostrar mensaje de error si no es válido */}
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="comment">Tu Comentario:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu comentario aquí"
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>
          Enviar Comentario
        </button>
      </form>

      {/* Mostrar mensaje de éxito */}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </section>
  );
};

export default CommentForm;



