import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { correo, contrasena } = await req.json();

    if (!correo || !contrasena) {
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
          resolve(NextResponse.json({ message: "Usuario no encontrado" }, { status: 401 }));
          return;
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);

        if (!passwordMatch) {
          resolve(NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 }));
          return;
        }

        // Crear token con el rol del usuario
        const token = jwt.sign(
          { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol },
          process.env.JWT_SECRET!,
          { expiresIn: "1h" }
        );

        resolve(NextResponse.json({
          message: "Inicio de sesión exitoso",
          token,
          user: { nombre: user.nombre, rol: user.rol }
        }, { status: 200 }));
      });
    });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}

