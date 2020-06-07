// importar dependência do sqlite3
const sqlite3 = require("sqlite3").verbose();

// criar o objeto que irá fazer operações no bando de dados
const db = new sqlite3.Database("./src/database/database.db");

// serve para que possa ser "pegada" pela função require la no servidor
module.exports = db;
// usando o objeto de banco de dados para nossas operações (SQL)
// db.serialize(() => {
//     // ---------Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXTE,
//             city TEXT,
//             items TEXT
//         );
//     `);


//     // ---------inserir dados na tabela
//     const query = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`;
//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60://images.unsplash.com/photo-1591457068877-3536c463f32e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ];

//     function afterInsertData(err){
//         if(err){
//             return console.log(err);
//         }

//         console.log("Cadastrado com sucesso");
//         console.log(this);
//     }
//     // db.run(query, values, afterInsertData);
    

//     // ---------Consultar dados da tabela
//     // db.all(`SELECT * FROM places`, function(err, rows){
//     //     if(err){
//     //         return console.log(err);
//     //     }

//     //     console.log("Aqui estão seus registros");
//     //     console.log(rows);
//     // });


//     // ---------deletrar um dado da tabela
//     // db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){
//     //     if(err){
//     //         return console.log(err);
//     //     }

//     //     console.log("Resgistro deletado.");
//     // });
// });