const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const routes = require('./routes/contactos')


const app = express();
const PORT = 4000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(routes);

app.get("/register", function(req,res){
    res.sendFile(path.join(__dirname + '/html/registro.html'))
})

app.get("/login", function(req,res){
    res.sendFile(path.join(__dirname + '/html/login.html'))
})

app.listen(PORT, function(){
    console.log("El servidor esta corriendo en el puerto", PORT);
});