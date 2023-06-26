const express = require('express');
const router = express.Router();

const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

const sequelize = new Sequelize(
  'exemplo', // banco
  'root', // usuario
  'root', // senha
  {
    host: '127.0.0.1', // ou localhost
    port: '3306',
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  }
)

sequelize.authenticate()
  .then(() => {
    console.log('Sequelize: Conectado com sucesso!');
  })
  .catch((error) => {
    console.log('Sequelize: Não foi possível conectar', error);
  });

const Usuario = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// GET /usuarios
router.get('/', async (request, response) => {
  try {
    const result = await Usuario.findAll();
    response.json(result);
  } catch (error) {
    console.log('Não foi possível consultar', error);
    response.status(500).send();
  }
});

// GET /usuarios/1
router.get('/:usuarioId', async (request, response) => {
  const usuarioId = request.params.usuarioId;

  try {
    const result = await Usuario.findByPk(usuarioId);
    if (result) {
      response.json(result);
    } else {
      response.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    console.log('Não foi possível consultar', error);
    response.status(500).send();
  }
});

// POST /usuarios
router.post('/', async (request, response) => {
  const usuario = {}
  usuario.nome = request.body.nome;
  usuario.idade = request.body.idade;

  try {
    await Usuario.create(usuario);
    response.status(201).send();
  } catch (error) {
    console.log('Não foi possível cadastrar', error);
    response.status(500).send();
  } 
});

module.exports = router;
