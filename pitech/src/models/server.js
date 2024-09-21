const express = require("express");
const mysql = require("mysql");
const mysql2 = require("mysql2/promise");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const privateKey = "chavePrivada123";
const multer = require("multer"); // Para lidar com o upload de arquivos
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Nível de segurança do hash

app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["Content-Type", "x-access-token", "authorization"],
  })
);
app.options("*", cors()); // Configurar as opções HTTP para permitir requisições de pré-voo
app.get("/", (req, res) => res.json({ message: "Funcionando!" }));

// Configuração do Multer para o armazenamento da imagem
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

const db = {
  host: "localhost",
  user: "root",
  password: "",
  database: "web",
};

async function execSQLQuery2(sqlQry, id) {
  // Criação da conexão com Promise
  const connection = await mysql.createConnection(db);

  try {
    // Realizando a consulta
    const results = await connection.query(sqlQry, id);

    // Retorna os resultados
    return results;
  } catch (error) {
    // Trata erros de consulta
    console.error("Erro na consulta:", error);
    throw error;
  } finally {
    // Certifique-se de encerrar a conexão
    await connection.end();
  }
}

function execSQLQuery(sqlQry, id, res) {
  const connection = mysql.createConnection(db);
  connection.connect();
  connection.query(sqlQry, id, (error, results, fields) => {
    console.log(error);
    if (error) res.json(error);
    else res.json(results);
    connection.end();
    console.log("executou!");
  });
}

// retorna result para query
// function resultSQLQuery(sqlQry, id) {
//   const connection = mysql.createConnection(db);

//   connection.connect();

//   // var [result] = connection.query(sqlQry, id);
// //   connection.query(sqlQry, id, (error, results, fields) => {
// //     console.log(error);
// //     if (error) return json(results);
// //     else return error;
// //     connection.end();
// //     console.log("executou!");
// //   });
//   try {
//     return result;
//   } catch (err) {
//     console.log("errorrrrrrrrrrr");
//     throw err;
//   }
// }

// retorna result para query
function resultSQLQuery(sqlQry, id) {
  const connection = mysql.createConnection(db);
  connection.connect();
  var results = connection.query(sqlQry, id);
  connection.end();
  try {
    return results;
  } catch (err) {
    console.log("errorrrrrrrrrrr");
    throw err;
  }
}

// function execSQLQuery(sqlQry, id, res) {
//   try {
//     const connection = mysql.createConnection(db);
//     connection
//       .query(sqlQry, id, (error, results, fields) => {
//         console.log(error);
//         if (error) res.json(error);
//         else res.json(results);

//         console.log("executou!");
//       })
//       .end();
//   } catch (e) {
//     console.log(e);
//   }
// }

const middlewareValidarJWT = (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  jwt.verify(jwtToken, privateKey, (err, userInfo) => {
    if (err) {
      res.status(403).end();
      return;
    }

    req.userInfo = userInfo;
    next();
  });
};

// connection.connect((err) => {
//   if (err) {
//     console.error("Erro ao conectar ao banco de dados Mysql:", err);
//     return;
//   }
//   console.log("Conexão estabelecida com o banco de dados Mysql");
// });

// todos os produtos
app.get("/produtos", (req, res) => {
  execSQLQuery("SELECT * FROM produto", null, res);
});

app.get("/produto/:id", (req, res) => {
  execSQLQuery(
    "SELECT * FROM produto WHERE idProduto = ? ",
    req.params.id,
    res
  );
});

//cria o usuario
app.post("/CriaUsuario", (req, res) => {
  const data = req.body;
  console.log(data);
  if (data.senha) {
    bcrypt.hash(data.senha, saltRounds, (err, hash) => {
      if (err) {
        console.log("erro 1");
        // Lida com erros
      } else {
        const id = [data.nome, data.email, hash];
        execSQLQuery(
          "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?);",
          id,
          res
        );
      }
    });
  }
});

//edita o usuario
app.put("/editarUsuarioProprio/:id", (req, res) => {
  const idUsu = [req.params.id];
  let data = req.body;
  if (data.senha) {
    bcrypt.hash(data.senha, saltRounds, (err, hash) => {
      if (err) {
        // Lida com erros
      } else {
        const id = [data.nome, data.email, hash, idUsu];
        execSQLQuery(
          "UPDATE Usuario set nome = ?, email = ?, senha = ? WHERE idUsuario = ?;",
          id,
          res
        );
      }
    });
  } else {
    const id = [data.nome, data.email, idUsu];
    execSQLQuery(
      "UPDATE Usuario set nome = ?, email = ?,  WHERE idUsuario = ?;",
      id,
      res
    );
  }
});

//login
app.post("/login", async (req, res) => {
  const data = req.body;
  console.log(data);
  const id = [data.email];
  const resultado = await execSQLQuery2(
    "SELECT idUsuario, senha FROM usuario WHERE email = ?",
    id
  );
  console.log(resultado.resp);
  var resultQuery = resultSQLQuery(
    "SELECT idUsuario, senha FROM usuario WHERE email = ?",
    id
  );
//   console.log(resultQuery);
  if (resultado) {
    console.log("aaa");
    bcrypt.compare(data.senha, resultado.senha, (err, result) => {
      if (err) {
        console.log("ccc");
        // Lida com erros
      } else if (result) {
        console.log("ddd");
        // Senha válida, o usuário está autenticado com sucesso
        var tokenData = {
          email: data.email,
          idUsuario: resultado.idUsuario,
        };
        jwt.sign(tokenData, privateKey, (err, token) => {
          if (err) {
            res.status(500).json({ mensagem: "Erro ao gerar o JWT" });
            return;
          }
          res.json({
            token: token,
            idUsuario: resultado.idUsuario,
          });
          // res.setHeader("x-access-token", token);
          // console.log("token", token);
          // res.setHeader("idUsuario", tokenData.idUsuario);
        });
      } else {
        // Senha incorreta, autenticação falhou
        res.status(401);
        res.send("mensage:" + "Senha incorreta");
        res.end();
      }
    });
  } else {
    console.log("bbb");
  }
});

app.listen(3000, () => {
  console.log("Servidor backend rodando na porta 3000");
});
