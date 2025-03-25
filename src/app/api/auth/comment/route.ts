import { NextRequest, NextResponse } from 'next/server';
import connection from '@/lib/db'; // Asegúrate de que la conexión esté configurada correctamente

export async function POST(req: NextRequest) {
  try {
    const { email, comentario } = await req.json();

    // Verificamos que ambos campos estén presentes
    if (!email || !comentario) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Insertamos el comentario en la base de datos
    return new Promise((resolve) => {
      connection.query(
        'INSERT INTO comentarios (email, comentario) VALUES (?, ?)',
        [email, comentario],
        (err, results) => {
          if (err) {
            console.error('Error en la consulta:', err);
            resolve(NextResponse.json({ message: "Error en el servidor" }, { status: 500 }));
            return;
          }

          // Confirmamos que el comentario fue insertado
          resolve(NextResponse.json({ message: "Comentario enviado exitosamente" }, { status: 200 }));
        }
      );
    });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}

