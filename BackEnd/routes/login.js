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

    console.log(username);
    console.log(password);


    DB.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (error, result) => {
            console.log("Erro:", error);
            console.log("Resultado:", result);
            if (error) {
                res.send({ error: error });
            }
            if (result[0].username == username) {
                if (result[0].password == password) {
                    const id = result[0].username;
                    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                        expiresIn: "1h",
                    })

                    req.session.user = result;
                    res.json({ auth: true, token: token, result: result });
                } else {
                    res.send({ message: "Password diferente" });
                }
            } else {
                res.send({ message: "User não existe" })
            }
        }
    );
});

//"Return"
module.exports = router;