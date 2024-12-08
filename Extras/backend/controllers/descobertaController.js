const Descoberta = require('../models/Descobertas');

const cadastrarDescoberta = async (req, res) => {
    console.log('Arquivo recebido:', req.file);
    console.log('Dados recebidos:', req.body);

    const { titulo, dataDescoberta, latitude, longitude, autores, horarioDescoberta, descricao, colaborador } = req.body;
    const foto = req.file ? req.file.path : null;

    try {
        const descobertaExistente = await Descoberta.findOne({ latitude, longitude });
        if (descobertaExistente) {
            return res.status(400).json({ error: 'Descoberta já registrada.' });
        }

        const novaDescoberta = new Descoberta({
            titulo,
            dataDescoberta: new Date(dataDescoberta).toISOString().split('T')[0],
            latitude,
            longitude,
            autores,
            horarioDescoberta,
            foto,
            descricao,
            colaborador,
        });

        await novaDescoberta.save();
        
        res.status(200).json({ message: 'Descoberta cadastrada com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar descoberta:', error);
        res.status(500).json({ error: 'Erro ao cadastrar descoberta.' });
    }
};


const listarDescobertas = async (req, res) => {
    try {
        const descobertas = await Descoberta.find({});
        res.status(200).json(descobertas);
    } catch (error) {
        console.error('Erro ao listar descobertas:', error);
        res.status(500).json({ error: 'Erro ao listar descobertas.' });
    }
};

const listarDescobertasPorColaborador = async (req, res) => {
    const { colaborador } = req.body;

    try {
        const descobertas = await Descoberta.find({ colaborador });
        if (descobertas.length === 0) {
            return res.status(404).json({ message: 'Nenhuma descoberta encontrada para este colaborador.' });
        }
        res.status(200).json(descobertas);
    } catch (error) {
        console.error('Erro ao listar descobertas por colaborador:', error);
        res.status(500).json({ error: 'Erro ao listar descobertas por colaborador.' });
    }
};


const atualizarDescoberta = async (req, res) => {
    const { id, titulo, dataDescoberta, latitude, longitude, autores, horarioDescoberta, descricao, colaborador } = req.body;
    let foto = req.file ? req.file.path : null;

    try {
        
        const descobertaExistente = await Descoberta.findById(id);

        if (!descobertaExistente) {
            return res.status(404).json({ error: 'Descoberta não encontrada.' });
        }

        
        if (!foto) {
            foto = descobertaExistente.foto;
        }

        
        const descobertaAtualizada = await Descoberta.findByIdAndUpdate(
            id,  
            {
                titulo,
                dataDescoberta,
                latitude,
                longitude,
                autores,
                horarioDescoberta,
                foto,  
                descricao,
                colaborador
            },
            { new: true }  
        );

        res.status(200).json({ message: 'Descoberta atualizada com sucesso!', descoberta: descobertaAtualizada });
    } catch (error) {
        console.error('Erro ao atualizar descoberta:', error);
        res.status(500).json({ error: 'Erro ao atualizar descoberta.' });
    }
};


const deletarDescoberta = async (req, res) => {
    const { id } = req.params;  

    try {
        
        const descoberta = await Descoberta.findById(id);

        if (!descoberta) {
            return res.status(404).json({ error: 'Descoberta não encontrada.' });
        }

        
        await Descoberta.deleteOne({ _id: id });

        res.status(200).json({ message: 'Descoberta deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar a descoberta:', error);
        res.status(500).json({ error: 'Erro ao deletar a descoberta.' });
    }
};

module.exports = { cadastrarDescoberta, listarDescobertas, listarDescobertasPorColaborador, deletarDescoberta, atualizarDescoberta };

