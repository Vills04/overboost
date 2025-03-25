"use client"; // Para que el componente use React Hooks en el cliente

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css"; // Importando el CSS como módulo
import { useUser } from "../context/UserContext"; // Importamos el contexto del usuario
import { useRouter } from "next/navigation"; // Para manejar la navegación

const Header = () => {
  const { user, setUser } = useUser(); // Obtenemos el usuario y la función para actualizarlo
  const router = useRouter(); // Hook para redireccionar

  // Función para cerrar sesión
  const handleLogout = () => {
    setUser(null); // Eliminamos el usuario del contexto
    router.push("/"); // Redirigir a la página de inicio
  };

  return (
    <header className={styles.header}>
      <section className={styles.section}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/LOGO-P.png" alt="Logo" width={60} height={60} />
          </Link>
        </div>

        {/* Menú de navegación */}
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/hombres">Hombres</Link>
            </li>
            <li>
              <Link href="/mujeres">Mujeres</Link>
            </li>
            <li>
              <Link href="/colecciones">Colecciones</Link>
            </li>
            <li className={styles.dropdown}>
              <Link href="/categorias">Todo el Calzado</Link>
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link href="/basquetbol">Basquetbol</Link>
                </li>
                <li>
                  <Link href="/running">Running</Link>
                </li>
                <li>
                  <Link href="/casuales">Casuales</Link>
                </li>
              </ul>
            </li>

            {/* Botón de usuario / login */}
            <li className={styles.btn}>
              {user ? (
                <div className={styles.userMenu}>
                  <span>👤 {user.nombre}</span>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <Link href="/ingresar">Ingresar</Link>
              )}
            </li>
          </ul>
        </nav>

        {/* Barra de búsqueda */}
        <div className={styles.barraBusqueda}>
          <input type="text" placeholder="Buscar..." />
          <Image className={styles.busqueda_icon} src="/buscar.png" alt="Buscar" width={20} height={20} />
        </div>

        {/* Icono del carrito */}
        <div className={styles.carrito}>
          <Link href="/carrito">
            <Image src="/carrito-de-compras.png" alt="Carrito" width={18} height={18} />
          </Link>
        </div>
      </section>
    </header>
  );
};

export default Header;
