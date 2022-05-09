const Sauce = require('../models/sauce');
const fs = require('fs');
//verbe Get pour une seul sauce spécifique
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))

}
//verbe Get pour tout les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce()
        .then(sauces => res.statuts(200).json(sauces))
        .catch(error => res.status(404).json({ error }))

}
//verbe Create pour crée une sauce 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};
//verbe Put pour modifié une sauce (image , nom ou description)
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce  modifiée !' }))
        .catch(error => res.status(400).json({ error }));
}
//verbe Delete pour supprimé une sauce 
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauces => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`image/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id }).then(
                    () => {
                        res.status(200).json({
                            message: 'Supprimé!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
            })
        })
        .catch(error => res.statsu(500).json({ error }))
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            if (!sauce) {
                res.status(404).json({
                    error: new Error('Sauce inexistante!')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                res.status(400).json({
                    error: new Error('Requête non autorisée!')
                });
            }

        }
    )


};

