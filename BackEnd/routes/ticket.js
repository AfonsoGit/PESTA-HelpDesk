//Ficheiro responsável pela gestão de tickets

//Includes
const { Router } = require('express');
const DB = require('../database/database');

//Middleware
const router = Router();

//Pedido GET do cliente para mostrar o conteúdo da DB
router.get('/', async (req, res) => {
    const result = await DB.promise().query(`SELECT * FROM tickets, instalacoes where tickets.sala = instalacoes.id_instalacao`)
    res.status(200).send(result[0])
});

router.get('/lab', async (req, res) => {
    const id = req.query.id
    const result_dir = await DB.promise().query(`SELECT * FROM tickets, instalacoes WHERE tickets.sala = instalacoes.id_instalacao AND instalacoes.diretor = ?`, id)
    if (result_dir[0].length == 0) {

        const result_tec = await DB.promise().query(`SELECT * FROM tickets, instalacoes WHERE tickets.sala = instalacoes.id_instalacao AND instalacoes.tecnico_responsavel = ?`, id)
        if (result_tec[0].length == 0) {
            res.status(200).send("Sem tickets para esse user")
        } else {
            res.status(200).send(result_tec[0])
        }

    } else {
        res.status(200).send(result_dir[0])
    }

})

//Pedido POST do cliente para submeter tickets novos e guardar na DB
router.post('/', (req, res) => {
    const { sala, motivo, descricao, pessoa, estado, prioridade, data } = req.body
    try {
        DB.query("INSERT INTO tickets VALUES(null, ?, ?, ?, ?, ?, ?, ?)",
            [sala, motivo, descricao, pessoa, estado, prioridade, data]);
        res.status(201)
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
router.delete('/', (req, res) => {
    DB.query('DELETE FROM tickets')
    res.status(410).send('Deleted')
})

//"Return"
module.exports = router;