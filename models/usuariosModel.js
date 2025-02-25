const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/Web_Users';

mongoose.connect(uri,{});

const usuariosSchema = new mongoose.Schema({
    correo: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    }
  },{
    versionKey: false,
    collection: "Usuarios"
  });

const Usuarios = mongoose.model('Usuarios', usuariosSchema);

module.exports = Usuarios;

