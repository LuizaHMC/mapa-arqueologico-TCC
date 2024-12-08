const mongoose = require("mongoose");

const DetalhesDescoberta = new mongoose.Schema({
    titulo: { type: String, required: true },
    dataDescoberta: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    autores: { type: String, required: true },
    horarioDescoberta: { type: String },
    foto: { type: String },
    descricao: { type: String, required: true },
    colaborador: { type: String, required: true },
}, 
{
    timestamps : true
},
{
    collection: "descobertas"
});

module.exports = mongoose.model("Descoberta", DetalhesDescoberta);