const express = require("express");
const mysql = require("mysql");
const mysql2 = require("mysql2");
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

function execSQLQueryEnde(sqlQry, id, res) {
  const connection = mysql.createConnection(db);
  connection.connect();
  connection.query(sqlQry, id, (error, results, fields) => {
    console.log(error);
    connection.end();
    console.log("executou!");
  });
}

// retorna result para query
async function resultSQLQuery(sqlQry, id) {
  const connection = mysql2.createConnection(db);
  connection.connect();

  var [result] = await connection.promise().query(sqlQry, id);
  try {
    return result;
  } catch (err) {
    console.log("errorrrrrrrrrrr");
    throw err;
  }
}

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

app.put("/editarUsuarioProprio/:id", async (req, res) => {
  const idUsu = req.params.id;
  let data = req.body;

  try {
    if (data.senha) {
      // Hash da senha se foi fornecida
      bcrypt.hash(data.senha, saltRounds, async (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Erro ao gerar o hash da senha" });
        } else {
          // Atualizar os dados do usuário
          const usuarioData = [data.nome, data.email, hash, idUsu];
          await resultSQLQuery(
            "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE idUsuario = ?;",
            usuarioData
          );
          await atualizarOuInserirEndereco(data, idUsu);
          return res
            .status(200)
            .json({ message: "Usuário e endereço atualizados com sucesso!" });
        }
      });
    } else {
      // Atualizar sem senha
      const usuarioData = [data.nome, data.email, idUsu];
      await resultSQLQuery(
        "UPDATE usuario SET nome = ?, email = ? WHERE idUsuario = ?;",
        usuarioData
      );
      await atualizarOuInserirEndereco(data, idUsu);
      return res
        .status(200)
        .json({ message: "Usuário e endereço atualizados com sucesso!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao atualizar o usuário ou endereço" });
  }
});

// Função para atualizar ou inserir endereço
async function atualizarOuInserirEndereco(data, idUsu) {
  try {
    // Checar se já existe um endereço para o idUsuario
    const [resultQuery] = await resultSQLQuery(
      "SELECT * FROM endereco WHERE idUsuario = ?;",
      [idUsu]
    );

    const enderecoData = [
      data.logradouro,
      data.numero,
      data.bairro,
      data.cidade,
      data.cep,
      data.uf,
      data.complemento,
      idUsu,
    ];
    console.log("aqui");
    if (resultQuery) {
      console.log("Endereço já existe");
      console.log(enderecoData);
      // Se já existe, atualizar o endereço
      await execSQLQueryEnde(
        `UPDATE endereco SET logradouro = ?, numero = ?, bairro = ?, cidade = ?, cep = ?, uf = ?, complemento = ? WHERE idUsuario = ?;`,
        enderecoData
      );
    } else {
      console.log("Endereço não existe");
      // Se não existe, inserir um novo endereço
      await execSQLQueryEnde(
        `INSERT INTO endereco (logradouro, numero, bairro, cidade, cep, uf, complemento, idUsuario) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        enderecoData
      );
    }
  } catch (err) {
    throw new Error("Erro ao atualizar ou inserir endereço");
  }
}

app.get("/dadosUsuario/:id", (req, res) => {
  execSQLQuery(
    "SELECT usuario.nome, usuario.email, endereco.cep, endereco.numero, endereco.complemento FROM usuario LEFT JOIN endereco ON usuario.idUsuario = endereco.idUsuario WHERE usuario.idUsuario = ?",
    req.params.id,
    res
  );
  console.log(req.params.id);
});

app.get("/dadosEndereco/:id", (req, res) => {
  execSQLQuery(
    "SELECT endereco.logradouro, endereco.numero, endereco.bairro, endereco.cidade, endereco.cep, endereco.uf, endereco.complemento FROM endereco WHERE endereco.idUsuario = ?",
    req.params.id,
    res
  );
  console.log(req.params.id);
});

//login
app.post("/login", async (req, res) => {
  const data = req.body;
  const id = [data.email];
  var [resultQuery] = await resultSQLQuery(
    "SELECT idUsuario, senha FROM usuario WHERE email = ?",
    id
  );
  if (resultQuery) {
    bcrypt.compare(data.senha, resultQuery.senha, (err, result) => {
      if (err) {
        // Lida com erros
      } else if (result) {
        // Senha válida, o usuário está autenticado com sucesso
        var tokenData = {
          email: data.email,
          idUsuario: resultQuery.idUsuario,
        };
        jwt.sign(tokenData, privateKey, (err, token) => {
          if (err) {
            res.status(500).json({ mensagem: "Erro ao gerar o JWT" });
            return;
          }
          res.json({
            token: token,
            idUsuario: resultQuery.idUsuario,
          });
        });
      } else {
        // Senha incorreta, autenticação falhou
        res.status(401);
        res.json({ mensagem: "Error" });
        res.end();
      }
    });
  }
});

app.post("/adicionaProduto", (req, res) => {
  const data = req.body;
  const id = [data.user, data.produto, 0];
  execSQLQuery(
    "INSERT INTO carrinho (Usuario_idUsuario, produto_idproduto, comprado) VALUES (?, ?, ?);",
    id,
    res
  );
});

app.get("/carrinho/:id", (req, res) => {
  execSQLQuery(
    "SELECT produto.descricao, produto.valor, produto.imagem1, carrinho.idCarrinho FROM produto INNER JOIN carrinho ON produto.idProduto = carrinho.produto_idproduto WHERE carrinho.Usuario_idUsuario = ?",
    req.params.id,
    res
  );
});

app.delete("/removerProduto/:id", (req, res) => {
  execSQLQuery(
    "DELETE FROM carrinho WHERE carrinho.idCarrinho = ?;",
    req.params.id,
    res
  );
});

app.listen(3000, () => {
  console.log("Servidor backend rodando na porta 3000");
});
