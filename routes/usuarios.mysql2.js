const express = require('express');
const router = express.Router();

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1', // ou localhost
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'exemplo',
});

connection.connect((error) => {
  if (error) {
    console.log('Não foi possível conectar', error);
  } else {
    console.log('Conectado com sucesso!');
  }
});

// GET /usuarios
router.get('/', (request, response) => {

  connection.query(
    'SELECT * FROM usuarios',
    (error, result) => {
      if (error) {
        console.log('Erro ao consultar', error);
        response.status(500);
        response.send();
      } else {
        response.json(result);
      }
    });

});

// GET /usuarios/1
router.get('/:usuarioId', (request, response) => {
  const usuarioId = request.params.usuarioId;

  connection.query(
    'SELECT * FROM usuarios WHERE id = ?',
    [usuarioId],
    (error, result) => {
      if (error) {
        console.log('Erro ao consultar', error);
        response.status(500);
        response.send();
      } else {
        const usuario = result[0];
        if (usuario) {
          response.json(usuario);
        } else {
          response.status(404);
          response.send('Usuário não encontrado');
        }
      }
    });

});

// POST /usuarios
router.post('/', (request, response) => {
  const usuario = {}
  usuario.nome = request.body.nome;
  usuario.idade = request.body.idade;

  connection.execute(
    'INSERT INTO usuarios (nome, idade) VALUES (?, ?)',
    [usuario.nome, usuario.idade],
    (error, result) => {
      if (error) {
        console.log('Erro ao cadastrar', error);
        response.status(500).send();
      } else {
        response.status(201).send();
      }
    }
  )
});

module.exports = router;
