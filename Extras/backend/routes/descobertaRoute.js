const express = require('express');
const router = express.Router();
const { cadastrarDescoberta, listarDescobertas, listarDescobertasPorColaborador, atualizarDescoberta, deletarDescoberta } = require('../controllers/descobertaController');
const upload = require('../config/upload');

router.post('/cadastrar-descoberta', upload, cadastrarDescoberta);

router.get('/listar-descobertas', listarDescobertas);

router.post('/listar-descobertas-colaborador', listarDescobertasPorColaborador);

router.put('/atualizar-descoberta/:id', upload, atualizarDescoberta);

router.delete('/deletar-descoberta/:id', deletarDescoberta);

module.exports = router;

