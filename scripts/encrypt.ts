import bcrypt from 'bcryptjs';

const encriptarContrasena = async () => {
  const contrasena = 'Admin123$'; // Cambia la contraseña aquí
  const hashedPassword = await bcrypt.hash(contrasena, 10);
  console.log('Contraseña encriptada:', hashedPassword);
};

encriptarContrasena();
