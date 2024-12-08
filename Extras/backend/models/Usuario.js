const mongoose = require("mongoose");

const DetalhesUsuario = new mongoose.Schema({
    nome: String,
    email: {
      type: String, 
      unique:true
    },
    telefone: String,
    dataRegistro: String,
    senha: String,
},
{
    collection: "usuarios",
}
);

DetalhesUsuario.pre('save', function(next) {
    if (this.dataRegistro) {
      const date = new Date(this.dataRegistro);
      this.dataRegistro = date.toISOString().split('T')[0];
    }
    next();
  });

module.exports = mongoose.model("usuarios", DetalhesUsuario);


