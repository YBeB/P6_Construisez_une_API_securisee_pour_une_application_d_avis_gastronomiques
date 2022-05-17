const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const express=require('express');
const app=express();
const helmet = require("helmet");
const path=require("path");
const saucesRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
require('dotenv').config({ path: process.cwd() + '/.env' });



mongoose.connect('mongodb+srv://younesbou:JZrT8v2jWI9Et7NE@cluster0.gx1hz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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
    app.use('/images',express.static(path.join(__dirname,'images')));
    app.use('/api/sauces',saucesRoutes);
    app.use(helmet({
        crossOriginResourcePolicy: false,
      }))
    app.use('/api/auth', userRoutes);




module.exports = app;