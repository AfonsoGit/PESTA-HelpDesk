const mysql = require('mysql2');
require("dotenv").config();

//Comandos para MySQL cmd line client
//DB = SampleApp        Tabela = users
/*
show databases; => Mostra as bases de dado criadas
CREATE DATABASE 'nome_da_DB'; => Cria a base de dados com o nome entre pelicas
USE 'nome_da_DB'; => Entra na 'nome_da_DB'
SHOW TABLES; => Mostra as tabelas existentes
CREATE TABLE 'nome_tabela' (nome_linha TIPO_ENTRADA, ....); => Cria a tabela com as linhas respetivas
select * from 'nome_tabela'; => mostra toda a informação guardada na tabela nome_tabela
delete from 'nome_tabela'; => elimina toda a informação na tabela nome_tabela
delete from 'nome_tabela' where 'nome_coluna'; = 'nome' => elimina a informação relativa à coluna 'nome_coluna' onde está a entrada 'nome'
*/


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: 'utf8mb4'
});

connection.connect(err => {
    let message = !err ? 'connected': 'connection failed';
    console.log(`mysql: ${message}`);
});

module.exports = connection;