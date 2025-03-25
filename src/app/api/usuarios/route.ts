import { NextResponse } from "next/server";
import mysql from "mysql2/promise"; // Usar promesas para evitar callbacks

// Configuración de conexión a la base de datos
const dbConfig = {
  host: "localhost", 
  user: "root",
  password: "root",
  database: "mi_tienda",
};

// Función para manejar la solicitud GET
export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute("SELECT id, nombre, correo, contrasena, rol, fecha_creacion FROM usuarios");
    await connection.end();

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error en la consulta:", error);
    return NextResponse.json({ message: "Hubo un problema al obtener los usuarios." }, { status: 500 });
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

// Función para manejar la solicitud DELETE (eliminar usuario)
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ message: "ID de usuario no proporcionado o inválido" }, { status: 400 });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );
    await connection.end();

    const resultSet = result as mysql.ResultSetHeader;
    if (resultSet.affectedRows === 0) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Usuario eliminado con éxito" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return NextResponse.json({ message: "Hubo un problema al eliminar el usuario." }, { status: 500 });
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

// Función para manejar la solicitud PATCH (actualizar usuario)
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, nombre, correo } = body;  // Solo nombre y correo se permitirán actualizar

  // Verificar que los datos necesarios estén presentes
  if (!id || isNaN(Number(id)) || !nombre || !correo) {
    return NextResponse.json({ message: "Faltan datos para actualizar el usuario." }, { status: 400 });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    // Actualizar solo nombre y correo del usuario en la base de datos
    const [result] = await connection.execute(
      "UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?",
      [nombre, correo, id]
    );
    await connection.end();

    const resultSet = result as mysql.ResultSetHeader;
    if (resultSet.affectedRows === 0) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Usuario actualizado con éxito" }, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return NextResponse.json({ message: "Hubo un problema al actualizar el usuario." }, { status: 500 });
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
