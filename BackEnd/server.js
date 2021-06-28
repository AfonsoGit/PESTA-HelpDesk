//Includes
const express = require('express');
const session = require('express-session');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: process.env.SECRET,
        cookie: { maxAge: 300 * 1000 }, //5 min
        saveUninitialized: true,
        resave: false,
        store: new session.MemoryStore(),
    })
);

//Mostra o tipo de pedido HTTP e o URL para que é dirigido
app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
})

//Submissão e mostra de tickets
app.use('/ticket', require('./routes/ticket'));

//Login
app.use('/login', require('./routes/login'));


app.listen(port, function () {
    console.log('Listening to port %d', port);
})
