const express = require('express');
const { loginUsuario, usuarioLogged } = require('../controllers/autenticacaoController');

const router = express.Router();

router.post('/login-usuario', loginUsuario);
router.post('/usuario-logged', usuarioLogged);

module.exports = router;