//Includes
const mysql = require('mysql2');

require("dotenv").config();

//Criação da conexão
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: 'utf8mb4'
});

//Inicio da conexão
connection.connect(err => {
    let message = !err ? 'connected': 'connection failed';
    console.log(`mysql: ${message}`);
});

module.exports = connection;