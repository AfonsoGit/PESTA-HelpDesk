//Ficheiro responsável pela autenticação (login)

//Includes
const { Router } = require('express');
const DB = require('../database/database');
const jwt = require('jsonwebtoken');

//Middleware
const router = Router();

//Pedido POST do cliente para autenticação de credênciais
router.post('/', (req, res) => {
    const { username, password } = req.body;
    var direcao = false;

    //Verificar se o utilizador pertence à direção
    DB.query(
        "SELECT username FROM membrosdirecao WHERE username = ?",
        username,
        (error, result) => {
            if (error) {
                res.send({ error: error })
            } else {
                if (result.length > 0) direcao = true
                else direcao = false
            }
        })

    //Verificação dos dados
    DB.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (error, result) => {
            //Condição de erro
            if (error) {
                res.send({ error: error });
            } else
                //Condição de dados válidos
                if (result.length == 0) {
                    res.send({ direcao: direcao, auth: false, token: '', message: "Dados inválidos" })
                } else if (result[0].username == username) {
                    if (result[0].password == password) {

                        //Criação do JWT
                        const id = result[0].username;
                        const token = jwt.sign({ id }, process.env.JWT_SECRET)

                        req.session.user = result;
                        res.status(202).json({ direcao: direcao, auth: true, token: token, result: result });
                    } else {
                        res.send({ direcao: direcao, auth: false, token: '', message: "Dados inválidos" });
                    }
                }
        }
    );
});

router.delete('/', (req, res) => {
    DB.query('DELETE FROM users')
    res.status(410).send('Deleted')
})

//"Return"
module.exports = router;