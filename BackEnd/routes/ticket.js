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

//Pedido GET do cliente para mostrar o conteúdo de info
router.get('/', (req, res) => {
    console.log(req.body);
    res.status(200).send(info);
});

//Pedido POST do cliente para submeter tickets novos e guardar em info
router.post('/', (req, res) => {
    const { id, sala, motivo, descricao, pessoa, estado, prioridade } = req.body
    //info.push(data)
    //Estrutura para submeter tickets (Alterar parametros de values)
    try {
        DB.query(`INSERT INTO tickets VALUES('${id}', '${sala}', '${motivo}', '${descricao}', '${pessoa}', '${estado}', '${prioridade}')`);
        res.status(201).send('Created Entry')
    }
    catch (error) {
        console.log(error)
    }
})

//Pedido POST do cliente para alteração dos dados na tabela
router.post('/editing', (req, res) => {
    const dados = req.body //Estrutura de dados: id [0], campo [1], valor do campo [2]
    //id = dados[0]; campo/coluna = dados[1]; valor do campo/coluna = dados[2]
})

//Pedido POST para eliminar linhas na DB
router.post('/deleting', (req, res) => {
    DB.query('DELETE FROM tickets')
    res.status(200).send('Deleted')
})

//"Return"
module.exports = router;