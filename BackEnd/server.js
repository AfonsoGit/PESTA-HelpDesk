//Includes
const express = require('express');
const session = require('express-session');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Sequencia de HTTP Requests para receber submissão de dados (app.get)
//e leitura dos existentes para uma tabela (app.post)
app.post('/users', (req, res) => {
    //user
    const data = req.body;
    console.log(data);
    info.push(data); //Adiciona os critérios definidos
    res.status(201).send('Created Entry');
})

//users
const info = [
    {id: 1, sala: 'F403', motivo: 'Componente Danificado', descricao: 'Microcontrolador ATMEGA328P'},
    {id: 2, sala: 'F404', motivo: 'Computador', descricao: 'Não entra no Windows'},
    {id: 3, sala: 'F405', motivo: 'Laboratório', descricao: 'Fonte de alimentação não funciona'}
];
//Mostra o que está no info
app.get('/users', (req, res) => {
    console.log(req.body);
    res.status(200).send(info);
});

app.listen(port, function() {
    console.log('Listening to port %d', port);
})
