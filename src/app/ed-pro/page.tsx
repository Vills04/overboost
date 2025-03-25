"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import "../../styles/vista-ad.css"; // Ajusta la ruta si es necesario

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string | null;
  imagenUrl: string | null;
  cantidad: number;
}

const EdProPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);

  useEffect(() => {
    if (!user || user.rol !== "administrador") {
      router.push("/"); // Redirigir si no es administrador
      return;
    }

    const fetchProductos = async () => {
      try {
        const response = await fetch("/api/producto");

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        setProductos(data);
        setLoading(false);
      } catch (error) {
        setError("Hubo un problema al obtener los productos.");
        setLoading(false);
      }
    };

    fetchProductos();
  }, [user, router]);

  const eliminarProducto = async (id: number) => {
    try {
      const response = await fetch("/api/producto", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== id)
      );
    } catch (error) {
      setError("Hubo un problema al eliminar el producto.");
    }
  };

  const editarProducto = (producto: Producto) => {
    setEditingProducto(producto);
  };

  const guardarCambios = async (producto: Producto) => {
    try {
      const response = await fetch("/api/producto", {
        method: "PATCH", // Usamos PATCH para actualizar solo algunos campos
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          categoria: producto.categoria,
          descripcion: producto.descripcion || null, // Puede ser null
          imagenUrl: producto.imagenUrl || null, // Puede ser null
          cantidad: producto.cantidad, // Nueva propiedad para cantidad
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      setProductos((prevProductos) =>
        prevProductos.map((p) => (p.id === producto.id ? producto : p))
      );
      setEditingProducto(null);
    } catch (error) {
      setError("Hubo un problema al actualizar el producto.");
    }
  };

  if (!user || user.rol !== "administrador") {
    return <p className="acceso-denegado">Acceso denegado</p>;
  }

  return (
    <div className="container">
      <h1>Panel de Administración - Productos</h1>
      <h2>Productos Registrados</h2>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="loading">Cargando productos...</p>
      ) : (
        <div>
            <button
            className="btn-ed-pro"
            onClick={() => router.push("/admin")}
          >
            Acceder a "Usuarios"
          </button>

          <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.precio}</td>
                  <td>{p.categoria}</td>
                  <td>{p.descripcion || "No disponible"}</td>
                  <td><img src={p.imagenUrl || "/default-image.jpg"} alt={p.nombre} width={50} height={50} /></td>
                  <td>{p.cantidad}</td>
                  <td>
                    <button onClick={() => eliminarProducto(p.id)}>❌</button>
                    <button onClick={() => editarProducto(p)}>✏️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>No hay productos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      )}

      {editingProducto && (
        <div className="form-edit">
          <h3>Editar Producto</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              guardarCambios(editingProducto);
            }}
          >
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={editingProducto.nombre}
                onChange={(e) =>
                  setEditingProducto({ ...editingProducto, nombre: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                id="precio"
                value={editingProducto.precio}
                onChange={(e) =>
                  setEditingProducto({ ...editingProducto, precio: +e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="categoria">Categoría</label>
              <input
                type="text"
                id="categoria"
                value={editingProducto.categoria}
                onChange={(e) =>
                  setEditingProducto({ ...editingProducto, categoria: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                value={editingProducto.descripcion || ""}
                onChange={(e) =>
                  setEditingProducto({ ...editingProducto, descripcion: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="imagenUrl">Imagen URL</label>
              <input
                type="text"
                id="imagenUrl"
                value={editingProducto.imagenUrl || ""}
                onChange={(e) =>
                  setEditingProducto({ ...editingProducto, imagenUrl: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                id="cantidad"
                value={editingProducto.cantidad}
                onChange={(e) =>
                  setEditingProducto({ ...editingProducto, cantidad: +e.target.value })
                }
              />
            </div>
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={() => setEditingProducto(null)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EdProPage;

