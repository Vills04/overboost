import { NextResponse } from "next/server";
import mysql from "mysql2/promise"; // Usar promesas para evitar callbacks

// Configuración de conexión a la base de datos
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "mi_tienda",
};

// Función para manejar la solicitud GET (obtener productos)
export async function GET(req: Request) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute("SELECT id, nombre, precio, categoria, descripcion, imagen_url FROM productos");
    await connection.end();

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error en la consulta:", error);
    return NextResponse.json({ message: "Hubo un problema al obtener los productos." }, { status: 500 });
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
}

// Función para manejar la solicitud POST (crear nuevo producto)
export async function POST(req: Request) {
  const body = await req.json();
  const { nombre, descripcion, precio, categoria, imagenUrl, cantidad } = body;

  // Verificar que los datos necesarios estén presentes
  if (!nombre || !precio || !categoria) {
    return NextResponse.json({ message: "Faltan datos para crear el producto." }, { status: 400 });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    // Insertar el nuevo producto en la base de datos
    const [result] = await connection.execute(
      "INSERT INTO productos (nombre, descripcion, precio, imagen_url, categoria, cantidad) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, descripcion || null, precio, imagenUrl || null, categoria, cantidad || 0]
    );

    // Acceder al insertId para devolver el ID del producto insertado
    const resultSet = result as mysql.ResultSetHeader;
    const insertId = resultSet.insertId;

    await connection.end();

    // Respuesta exitosa con el ID del producto creado
    return NextResponse.json({ message: "Producto creado con éxito", id: insertId }, { status: 201 });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return NextResponse.json({ message: "Hubo un problema al crear el producto." }, { status: 500 });
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
}

// Función para manejar la solicitud PATCH (actualizar producto)
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, nombre, precio, categoria, descripcion, imagenUrl } = body;

  // Verificar que los datos necesarios estén presentes
  if (!id || isNaN(Number(id)) || !nombre || !precio || !categoria || !descripcion || !imagenUrl) {
    return NextResponse.json({ message: "Faltan datos para actualizar el producto." }, { status: 400 });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    // Actualizar los detalles del producto en la base de datos
    const [result] = await connection.execute(
      "UPDATE productos SET nombre = ?, precio = ?, categoria = ?, descripcion = ?, imagen_url = ? WHERE id = ?",
      [nombre, precio, categoria, descripcion, imagenUrl, id]
    );
    await connection.end();

    const resultSet = result as mysql.ResultSetHeader;
    if (resultSet.affectedRows === 0) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Producto actualizado con éxito" }, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return NextResponse.json({ message: "Hubo un problema al actualizar el producto." }, { status: 500 });
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
}

// Función para manejar la solicitud DELETE (eliminar producto)
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ message: "ID de producto no proporcionado o inválido" }, { status: 400 });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    // Eliminar el producto de la base de datos
    const [result] = await connection.execute(
      "DELETE FROM productos WHERE id = ?",
      [id]
    );
    await connection.end();

    const resultSet = result as mysql.ResultSetHeader;
    if (resultSet.affectedRows === 0) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Producto eliminado con éxito" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return NextResponse.json({ message: "Hubo un problema al eliminar el producto." }, { status: 500 });
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
}

