"use client";
import React, { useState } from "react";
import Image from "next/image"; 
import "../../styles/globals.css"; 
import { useRouter } from "next/navigation"; 

const RecuperarContrasena = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, nuevaContrasena: "temporal" }), 
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
      } else {
        setMessage(data.message || "Error al verificar el correo.");
      }
    } catch (error) {
      setMessage("Hubo un problema con la solicitud.");
      console.error(error);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, nuevaContrasena: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Contraseña actualizada. Inicia sesión.");
        setStep(1); // Reiniciar el formulario
        setEmail("");
        setNewPassword("");
      } else {
        setMessage(data.message || "Error al actualizar la contraseña.");
      }
    } catch (error) {
      setMessage("Hubo un problema con la solicitud.");
      console.error(error);
    }
  };

  return (
    <div className="recuper-container">
      <div className="recuper-content">
        <div className="recuper-left">
          <Image
            src="/shai.png"  
            alt="Imagen de recuperación"
            layout="responsive"
            width={600}
            height={400}
            objectFit="cover"
          />
        </div>

        <div className="recuper-right">
          <h2>Recuperar Contraseña</h2>

          {message && <p className="recuper-message">{message}</p>}

          {step === 1 ? (
            <form onSubmit={handleEmailSubmit} className="recuper-form">
              <div className="recuper-form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Ingresa tu correo"
                />
              </div>
              <button type="submit" className="recuper-button">Validar Correo</button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="recuper-form">
              <div className="recuper-form-group">
                <label htmlFor="newPassword">Nueva Contraseña</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Ingresa tu nueva contraseña"
                />
              </div>
              <button type="submit" className="recuper-button">Actualizar Contraseña</button>
            </form>
          )}

          <p className="recuper-link">
            ¿Ya tienes cuenta? <a href="/ingresar">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecuperarContrasena;


