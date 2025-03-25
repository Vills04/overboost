import { NextResponse } from "next/server";
import conexion from "../../../lib/db"; // Asegúrate de tener esta ruta correcta
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Obtener token de la cabecera

    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (decoded.rol !== "administrador") {
      return NextResponse.json({ message: "Acceso denegado" }, { status: 403 });
    }

    const [rows]: any = await conexion.query("SELECT id, nombre, correo, contrasena, rol, fecha_creacion FROM usuarios");

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error); // Más detalles del error
    return NextResponse.json({ message: "Error al obtener los usuarios" }, { status: 500 });
  }
}

