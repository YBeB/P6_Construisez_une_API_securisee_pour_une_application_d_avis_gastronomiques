const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

//Création d'un compte 
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => {
                    res.writeHead(
                        400,
                        error.message,
                        {
                            "content-type": "application/json",
                        }
                    );
                    res.end(error.message)
                })
        })
        .catch(error => res.status(500).json({ error }))
}

//Login a un compte
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.writeHead(
                    500,
                    "Utilisateur inexistant",
                    {
                        "content-type": "application/json",
                    }
                );
                res.end("Utilisateur inexistant")
            }
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.writeHead(
                                500,
                                "Le mot de passe est incorrect",
                                {
                                    "content-type": "application/json",
                                }
                            );
                            res.end("Le mot de passe est incorrect")
                        }
                        else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    `${process.env.RND_TKN}`,
                                    { expiresIn: '24h' }
                                )
                            })
                        }
                    })
                    .catch(error => {
                        res.writeHead(
                            500,
                            "Le mot de passe est incorrect",
                            {
                                "content-type": "application/json",
                            }
                        );
                        res.end("Le mot de passe est incorrect")
                    })
            }
        })
        .catch(error => {
            res.writeHead(
                500,
                "Utilisateur inexistant",
                {
                    "content-type": "application/json",
                }
            );
            res.end("Utilisateur inexistant")
        })
}