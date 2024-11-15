const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public"))); // Asumiendo que tus archivos están en la carpeta 'public'

// Configura la conexión a la base de datos MySQL en Azure
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,         // Host de la base de datos en Azure
  user: process.env.MYSQL_USER,         // Usuario para la conexión a la base de datos
  password: process.env.MYSQL_PASSWORD, // Contraseña del usuario
  database: process.env.MYSQL_DATABASE, // Base de datos
  port: process.env.MYSQL_PORT,         // Puerto, usualmente es 3306
  ssl: {
    rejectUnauthorized: false // Configuración SSL para conexiones seguras en Azure (si es necesario)
  }
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL en Azure");
});

// Función para registrar un usuario
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO credenciales (usuario, contraseña) VALUES (?, ?)";

  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error al registrar usuario:", err);
      res.status(500).send("Error al registrar usuario");
      return;
    }
    res.status(201).send("Usuario registrado exitosamente");
  });
});

// Función para consultar los usuarios
app.get("/api/users", (req, res) => {
  const query = "SELECT usuario FROM credenciales";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al consultar usuarios:", err);
      res.status(500).send("Error al consultar usuarios");
      return;
    }
    res.status(200).json(results);
  });
});

// Configura el puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

