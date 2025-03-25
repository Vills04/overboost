import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connection from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { nombre, correo, contrasena, rol } = await req.json();

    if (!nombre || !correo || !contrasena || !rol) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    // Verificar si el correo ya está registrado
    const [rows] = await connection.promise().query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if ((rows as any).length > 0) {
      return NextResponse.json({ message: 'El correo ya está registrado.' }, { status: 400 });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar el usuario en la base de datos
    await connection.promise().query(
      'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)',
      [nombre, correo, hashedPassword, rol]
    );

    return NextResponse.json({ message: 'Usuario registrado con éxito' }, { status: 201 });
  } catch (error) {
    console.error('Error en el registro:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
