const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');

const cadastrarUsuario = async (req, res) => {
    
    const { nome, email, telefone, dataRegistro, senha } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Email já registrado.' });
        }

        const encryptedSenha = await bcrypt.hash(senha, 10);
        await Usuario.create({
            nome,
            email,
            telefone,
            dataRegistro: new Date(dataRegistro).toISOString().split('T')[0],
            senha: encryptedSenha,
        });
        res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
};

module.exports = { cadastrarUsuario };

