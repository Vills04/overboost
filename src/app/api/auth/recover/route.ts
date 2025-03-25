import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connection from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { correo, nuevaContrasena } = await req.json();

    if (!correo || !nuevaContrasena) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    return new Promise((resolve) => {
      connection.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, results: any) => {
        if (err) {
          console.error('Error en la consulta:', err);
          resolve(NextResponse.json({ message: "Error en el servidor" }, { status: 500 }));
          return;
        }

        if (results.length === 0) {
          resolve(NextResponse.json({ message: "Correo no encontrado" }, { status: 404 }));
          return;
        }

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(nuevaContrasena, salt);

        // Actualizar la contraseña en la BD
        connection.query('UPDATE usuarios SET contrasena = ? WHERE correo = ?', [hashedPassword, correo], (updateErr) => {
          if (updateErr) {
            console.error('Error al actualizar la contraseña:', updateErr);
            resolve(NextResponse.json({ message: "No se pudo actualizar la contraseña" }, { status: 500 }));
            return;
          }

          resolve(NextResponse.json({ message: "Contraseña actualizada correctamente" }, { status: 200 }));
        });
      });
    });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
