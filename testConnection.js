const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // O el host correcto
  user: 'root', // Tu usuario de MySQL
  password: 'root', // Tu contraseña
  database: 'mi_tienda', // Tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ', err.stack);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
  connection.end(); // Cierra la conexión
});
