const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config/keys');

const Usuario = require('../models/Usuario');

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ email });
        if (!usuarioExistente) {
            return res.status(400).json({ error: 'Usuário/Senha incorreto.' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuarioExistente.senha);
        if (senhaCorreta) {
            const token = jwt.sign({ email: usuarioExistente.email }, jwtSecret);
            return res.status(201).json({ status: "ok", data: token });
        } else {
            return res.status(400).json({ status: "error", error: "Usuário/Senha incorreto." });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao processar o login.' });
    }
};

const usuarioLogged = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const usuarioExistente = await Usuario.findOne({ email: decoded.email });
        if (usuarioExistente) {
            return res.status(200).json({ status: "success", data: usuarioExistente });
        } else {
            return res.status(400).json({ status: "error", error: "Usuário/Senha incorreto." });
        }
    } catch (error) {
        return res.status(500).json({ status: "error", error: "Token inválido" });
    }
};

module.exports = { loginUsuario, usuarioLogged };

