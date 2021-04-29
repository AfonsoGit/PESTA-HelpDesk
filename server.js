const express = require('express');
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

//app.get() - lê os dados que estão no "posts"
//app.post() - submete os dados para o "posts" (após validação do código de autorização)

const posts = [
    {title: 'Telemóvel'},
    {title: 'Camarões salgados'},
    {title: 'Lenços de papel'}
]
//Lê os parametros dentro do array "posts"
//Envia 200 (OK) se for sucedido. Envia 404 (Not Found) se tiver fracassado
app.get('/posts', (req, res) => {
    console.log(req.query);
    const {title} = req.query;
    if(title) {
        const post = posts.find((post) => post.title === title)
        if(post) res.status(200).send(post);
        else res.status(404).send('Not Found');
    }
    res.status(200).send(posts);
})
//Submeter dados para serem guardados no "posts" e depois serem lidos no app.get()
//Envia 201 (criado) se for sucedido. Envia 403 (proibido) se tiver fracassado
app.post('/posts', (req, res) => {
    const {authorization} = req.headers;
    if(authorization && authorization === '123') {
        const post = req.body;
        console.log(post);
        posts.push(post);
        res.status(201).send(post);
    } else {
        res.status(403).send('Forbidden');
    }
})

app.listen(port, function() {
    console.log('Listening to port %d', port);
})
