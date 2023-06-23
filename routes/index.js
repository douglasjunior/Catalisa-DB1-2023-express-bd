const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', function(req, res, next) {
  const payload = {
    nome: 'Douglas Junior',
    email: 'nassifrroma@gmail.com',
    tipo: 'ADMINISTRADOR',
  };

  const token = jwt.sign(payload, 'minha-chave', {
    expiresIn: '7d'
  });

  res.send(token);
});

module.exports = router;
