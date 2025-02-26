const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const Usuarios = require('../models/usuariosModel');
const Contactos = require('../models/contactosModel');
const router = express.Router()
const { MongoClient, ObjectId } = require('mongodb');
const { error } = require('console');
const { send } = require('process');
const uri = "mongodb://localhost:27017/Web_Users";
const client = new MongoClient(uri, {});

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

router.get("/contactos", async function(req,res){
    const contactos = await Contactos.find()
    .then(contactos => res.json(contactos))
    .catch(err => res.json(contactos) )
    console.log("Todos los contactos");
})

router.get("/usuarios", async function(req,res){
    const usuarios = await Usuarios.find()
    .then(usuarios => res.json(usuarios))
    .catch(err => res.json(usuarios) )
    console.log("Todos los usuarios");
})

router.get("/contactos/:id", async function(req,res){
    const id_contacto = req.params.id;
    const contacto = await Contactos.findById(id_contacto)
    console.log("Contacto/s encontrado/s", contacto);
    res.send(contacto)
})

router.get("/usuarios/:id", async function(req,res){
    const id_usuarios = req.params.id;
    const usuarios = await Usuarios.findById(id_usuarios)
    console.log("Contacto/s encontrado/s", usuarios);
    res.send(usuarios)
})

router.post("/RegistrarUsuario", async function inserOneDocument(req,res){
    const correo = req.body.correo;
    const password = req.body.password;
        try {
            await client.connect();
            const database = client.db('Web_Users');
            const collection = database.collection('Usuarios');
            const doc = { correo: correo , password: password };
            const result = await collection.insertOne(doc);
            console.log(`A document was inserted with the _id: ${result}`);
        } finally {
            await client.close();
        }
})

router.post("/RegistrarContacto", async function inserOneDocument(req,res){
    const name = req.body.name;
    const surname = req.body.surname;
    const age = req.body.age;
    const usuario = req.body.usuario;
        try {
            await client.connect();
            const database = client.db('Web_Users');
            const collection = database.collection('Contactos');
            const doc = { name: name , surname: surname , age: age , usuario: usuario};
            const result = await collection.insertOne(doc);
            console.log(`A document was inserted with the _id: ${result}`);
        } finally {
            await client.close();
        }
})

router.put("/modificarContacto/:id", async function(req,res){
    try {
        const id = req.params.id;
        const update = req.body;
        const contactoUpdate = await Contactos.findByIdAndUpdate(id,update,{new:true,runValidators:true})
        if(!contactoUpdate){
            res.status(404).json({missing:"error"})
            res.status(contactoUpdate)
        }
    } catch (err) {
        res.json({error})
    }
})

router.put("/modificarUsuario/:id", async function(req,res){
    try {
        const id = req.params.id;
        const update = req.body;
        const usuarioUpdate = await Usuarios.findByIdAndUpdate(id,update,{new:true,runValidators:true})
        if(!usuarioUpdate){
            res.status(404).json({missing:"error"})
            res.status(usuarioUpdate)
        }
    } catch (err) {
        res.json({error})
    }
})

router.delete("/deleteContacto/:id", async function(req,res){
    const id = req.params.id;
    const result = await Contactos.deleteOne({_id: id});
    res.send({result});
    console.log("el contacto se a borrado correctamente")

})

router.delete("/deleteUsuario/:id", async function(req,res){
    const id = req.params.id;
    const result = await Usuarios.deleteOne({_id: id});
    res.send({result});
    console.log("el usuario se a borrado correctamente")

})

router.get("/test", async function(req,res){
    const innerjoin = async function(){
        const result = Usuarios.aggregate([
            {$lookup: {
                from: "Contactos",
                localField: "correo",
                foreignField: "usuario",
                as: "inner join"
            }}
        ]).then(result => res.json(result))
    }
    innerjoin();
})

module.exports = router;
