"use client"; // Asegura que el código se ejecute en el cliente

// src/app/auth/register/page.tsx
import React, { useState } from "react";
import Image from 'next/image';
import '../../styles/globals.css'; // Ajusta la ruta según tu estructura

const Registro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Expresión regular para validar correo
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Expresión regular para validar contraseña
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de correo
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // Validación de contraseña
    if (!passwordRegex.test(password)) {
      setError("Ingresa una mayúscula, un número y un carácter especial.");
      return;
    }

    // Validación de contraseñas coincidentes
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Datos para enviar al backend
    const userData = {
      nombre: name,
      correo: email,
      contrasena: password,
      rol: "cliente" // Puedes cambiarlo si quieres agregar un rol distinto
    };

    try {
      // Enviar los datos al backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        // Si el registro fue exitoso
        setSuccessMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        // Si ocurrió un error durante el registro
        setError(data.message || "Hubo un error al registrar al usuario.");
      }
    } catch (err) {
      setError("Error de red o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-content">
        <div className="register-left">
          <Image
            src="/shai.png"
            alt="Imagen de registro"
            layout="responsive"
            width={600}
            height={400}
            objectFit="cover"
          />
        </div>

        <div className="register-right">
          <h2>Crear una Cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ingresa tu nombre completo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Crea una contraseña"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirma tu contraseña"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>

          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <p>
            ¿Ya tienes cuenta? <a href="/ingresar">Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
