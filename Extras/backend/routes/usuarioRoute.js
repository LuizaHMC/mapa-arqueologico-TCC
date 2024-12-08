const express = require('express');
const { cadastrarUsuario } = require('../controllers/usuarioController');

const router = express.Router();

router.post('/cadastrar', cadastrarUsuario);

module.exports = router;

