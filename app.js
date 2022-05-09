const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const express=require('express');
const app=express();
const helmet = require("helmet");

mongoose.connect('mongodb+srv://younesbou:MINMPBDehQEoDRj9@cluster0.gx1hz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

    app.use(express.json());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });

    app.use(bodyParser.json());
    app.use(helmet());
    app.use('/images',express.static(path.join(__dirname,'images')));
    app.use('/api/auth', userRoutes);
    app.use('/api/sauces',stuffRoutes);



module.exports = app;