"use client"; // Asegura que el código se ejecute en el cliente

import React, { useState } from "react";
import Image from "next/image"; 
import "../../styles/globals.css"; 
import { useRouter } from "next/navigation"; 
import { useUser } from "../../context/UserContext"; 

const Ingresar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const router = useRouter(); 
  const { setUser } = useUser(); 

  // Expresión regular para validar un email que termine en .com
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com)$/;

  // Expresión regular para validar contraseña (debe tener al menos una mayúscula, un número y un carácter especial)
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    setError(""); 

    // Validación de correo
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un correo electrónico válido que termine en .com.");
      setLoading(false);
      return;
    }

    // Validación de contraseña
    if (!passwordRegex.test(password)) {
      setError("La contraseña debe contener al menos una mayúscula, un número y un carácter especial.");
      setLoading(false);
      return;
    }

    const loginData = { correo: email, contrasena: password };

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Inicio de sesión exitoso:", data);

        // Guardamos en el contexto el usuario con su rol
        setUser({ nombre: data.user.nombre, rol: data.user.rol });

        // Redirigir según el rol
        if (data.user.rol === "administrador") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        setError(data.message || "Error desconocido");
      }
    } catch (error) {
      setError("Hubo un problema con el inicio de sesión");
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-content">
        <div className="login-left">
          <Image
            src="/shai.png" 
            alt="Imagen de login"
            layout="responsive"
            width={600}
            height={400}
            objectFit="cover"
          />
        </div>

        <div className="login-right">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>} 
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingresa tu correo"
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
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>
          <p>
            ¿No tienes cuenta? <a href="/registro">Regístrate</a>
          </p>
          <p>
            ¿Olvidaste tu contraseña? <a href="/recuperar">Recuperala</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ingresar;


