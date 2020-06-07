const express = require("express"); //essa const vai receber uma função
const server = express(); // server vai receber um objeto servidor


// pegar o banco de dados
const db = require("./database/db.js");




//configurar pasta public, torna todos esses arquivos disponíveis ao meu diretório raiz
// teste no navergador: http://localhost:3000/styles/main.css
//  "styles/main.css" é exatamente o caminho colocado em index.html como uma pasta de estili, por exemplo
server.use(express.static("public"));

// habilitar o uso do req.body (importante para receber dados pelo método POST)
server.use(express.urlencoded({extended: true}));

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

    // req.query: query strings da nossa url (aquele que fica lá em cima quando clicla em "cadastrar")
    // console.log(req.query);

    return res.render("create-point.html");
});

// esse novo caminho deve ser colocado lá html na tag form 
server.post("/savepoint", (req, res) => {

    //  req.body: o corpo do nosso formulário
    //  foi habilitado no início desse código
    // console.log(req.body)

    // guardar no cbanco de dados
    const query = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    // call back
    function afterInsertData(err){
        if(err){
            console.log(err);
            return res.send("Erro no cadastro!");
        }

        // console.log("Cadastrado com sucesso");
        // console.log(this);


        return res.render("create-point.html", {saved: true});
    }
    db.run(query, values, afterInsertData);

    
});


server.get("/search", (req, res) =>{

    const search = req.query.search;

    if(search == ""){
        // Quando nada pe digitado
        return res.render("search-results.html", {total: 0});
    }

    // pegar os dados do banco
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err);
        }


        const total = rows.length;

        return res.render("search-results.html", {places: rows, total: total});

    });

    // quando uma requisição é feita para o SQL, ele exige uma callback, porque enquanto ele executa o comando 
    // SQL o fluxo do códico segue normal, quando o comando SQL termina de executar aí ee volta e executa essa função.
        
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