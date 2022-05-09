const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const app=express()
const express=require('express');

mongoose.connect('mongodb+srv://younesbou:MINMPBDehQEoDRj9@cluster0.gx1hz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

    app.use(express.json());

    app.use(bodyParser.json());