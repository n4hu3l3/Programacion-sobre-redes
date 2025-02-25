const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/Web_Users';

mongoose.connect(uri,{});

  const contactosSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    surname: {
      type: String,
      require: true
    },
    age: {
        type: Number,
        require: true
    },
    usuario: {
      type: String , refs: "usuarios"
    }
  },{
    versionKey: false,
    collection: "Contactos"
  });

const Contactos = mongoose.model('Contactos', contactosSchema);

module.exports = Contactos;
