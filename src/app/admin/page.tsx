"use client"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import "../../styles/vista-ad.css"; // Ajusta la ruta si es necesario

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

const AdminPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);

  useEffect(() => {
    if (!user || user.rol !== "administrador") {
      router.push("/"); // Redirigir si no es administrador
      return;
    }

    const fetchUsuarios = async () => {
      try {
        const response = await fetch("/api/usuarios", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        setUsuarios(data);
        setLoading(false);
      } catch (error) {
        setError("Hubo un problema al obtener los usuarios.");
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [user, router]);

  const eliminarUsuario = async (id: number) => {
    try {
      const response = await fetch("/api/usuarios", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
    } catch (error) {
      setError("Hubo un problema al eliminar el usuario.");
    }
  };

  const editarUsuario = (usuario: Usuario) => {
    setEditingUser(usuario);
  };

  const guardarCambios = async (usuario: Usuario) => {
    try {
      const response = await fetch("/api/usuarios", {
        method: "PATCH", // Usamos PATCH para actualizar solo algunos campos
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((u) => (u.id === usuario.id ? usuario : u))
      );
      setEditingUser(null);
    } catch (error) {
      setError("Hubo un problema al actualizar el usuario.");
    }
  };

  if (!user || user.rol !== "administrador") {
    return <p className="acceso-denegado">Acceso denegado</p>;
  }

  return (
    <div className="container">
      <h1>Panel de Administración</h1>
      <h2>Usuarios Registrados</h2>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="loading">Cargando usuarios...</p>
      ) : (
        <div>
          {/* Botón encima de la tabla */}
          <button
            className="btn-ed-pro"
            onClick={() => router.push("/ed-pro")}
          >
            Acceder a "Productos"
          </button>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>{u.correo}</td>
                    <td>{u.rol}</td>
                    <td>
                      <button onClick={() => eliminarUsuario(u.id)}>❌</button>
                      <button onClick={() => editarUsuario(u)}>✏️</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No hay usuarios registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editingUser && (
        <div className="form-edit">
          <h3>Editar Usuario</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              guardarCambios(editingUser);
            }}
          >
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={editingUser.nombre}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, nombre: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                id="correo"
                value={editingUser.correo}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, correo: e.target.value })
                }
              />
            </div>
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={() => setEditingUser(null)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPage;


