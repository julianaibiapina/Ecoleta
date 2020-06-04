const express = require("express"); //essa const vai receber uma função
const server = express(); // server vai receber um objeto servidor

//configurar pasta public, torna todos esses arquivos disponíveis ao meu diretório raiz
// teste no navergador: http://localhost:3000/styles/main.css
//  "styles/main.css" é exatamente o caminho colocado em index.html como uma pasta de estili, por exemplo
server.use(express.static("public"));

// ----------------------- nunjucks -------------------------
// utilizando tamplate engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server.get("/", (req, res) =>{
    return res.render("index.html");
});

server.get("/create-point", (req, res) =>{
    return res.render("create-point.html");
});

server.get("/search", (req, res) =>{
    return res.render("search-results.html");
});

//  --------- este código é para antes da configuração do nunjucks

// configurar caminhos da minha aplicação
// página inicial
// req é a requisição
// res é a resposta

// server.get("/", (req, res) =>{
//     // __dirname é uma variável já criada pelo node, é o nosso diretório
//     res.sendFile(__dirname + "/views/index.html");
// });

// server.get("/create-point", (req, res) =>{
//     // __dirname é uma variável já criada pelo node, é o nosso diretório
//     res.sendFile(__dirname + "/views/create-point.html");
// });

// Depois disso é preciso configurar os arquivos hmtl para que eles chamem a rota do servidor
// onde tinha escrito /views/create-point.html agora deve estar escrito /create-point

//  -----------------------------------------------------------------------


// ligar o servidor
server.listen(3000); // fica "ouvindo" a porta 3000 