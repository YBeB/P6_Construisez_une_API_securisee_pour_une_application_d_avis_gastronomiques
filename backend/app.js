const express = require ('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')


const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

const app = express()
//Helmet permet la securisation en mettant divers headers HTTP on 
app.use(helmet({
    crossOriginResourcePolicy: false,
  }))
//Connection a mongodb
mongoose.connect('mongodb+srv://younesbou:V5qq368lS0gcGMPC@cluster0.gx1hz.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})
//Body-parser permet de lire les entré et les stocké 
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)

module.exports = app