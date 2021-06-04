//Ficheiro responsável pela gestão de tickets

//Includes
const { Router } = require('express');
const DB = require('../database/database');

//Middleware
const router = Router();

//Array onde estarão contidos os tickets todos
const info = [
    { id: 1, sala: 'F404', motivo: 'Computador', descricao: 'Virus', submissor: 'diretor', estado: 'A ser processado' },
    { id: 2, sala: 'F403', motivo: 'Componente Danificado', descricao: 'Microcontrolador ATMEGA328P', submissor: 'docente', estado: 'A ser processado' },
    { id: 3, sala: 'F404', motivo: 'Osciloscópio', descricao: 'Mostrador partido', submissor: 'diretor', estado: 'A ser processado' },
    { id: 4, sala: 'F405', motivo: 'Laboratório', descricao: 'Fonte de alimentação não funciona', submissor: 'tecnico', estado: 'A ser processado' },
    { id: 5, sala: 'F404', motivo: 'Computador', descricao: 'Não entra no Windows', submissor: 'diretor', estado: 'A ser processado' }
];

//Pedido GET do cliente para mostrar o conteúdo da DB
router.get('/', async (req, res) => {
    const result = await DB.promise().query(`SELECT * FROM tickets`)
    res.status(200).send(result[0])
});

//Pedido POST do cliente para submeter tickets novos e guardar na DB
router.post('/', (req, res) => {
    const { id, sala, motivo, descricao, submissor, estado, prioridade } = req.body
    //info.push(data)
    //Estrutura para submeter tickets (Alterar parametros de values)
    try {
        DB.query("INSERT INTO tickets VALUES(?, ?, ?, ?, ?, ?, ?)",
            [id, sala, motivo, descricao, submissor, estado, prioridade]);
        res.status(201).send("Entry Created")
    }
    catch (error) {
        console.log(error)
    }
})

//Pedido POST do cliente para alteração dos dados na tabela
router.put('/editing', (req, res) => {
    const dados = req.body
    //id = dados[0]; campo/coluna = dados[1]; valor do campo/coluna = dados[2]
    if (dados[1] === "estado") {
        DB.query("UPDATE tickets SET estado = ? WHERE id = ?",
            [dados[2], dados[0]],
            (error, result) => {
                if (error) {
                    console.log("Erro: " + error)
                } else {
                    res.status(202)
                }
            })
    }

    if (dados[1] === "prioridade") {
        DB.query("UPDATE tickets SET prioridade = ? WHERE id = ?",
            [dados[2], dados[0]],
            (error, result) => {
                if (error) {
                    console.log("Erro: " + error)
                } else {
                    res.status(202)
                }
            })
    }

})

//Pedido POST para eliminar linhas na DB
router.post('/deleting', (req, res) => {
    DB.query('DELETE FROM tickets')
    res.status(410).send('Deleted')
})

//"Return"
module.exports = router;