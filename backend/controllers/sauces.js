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
    Sauce.find()
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

exports.likeSauce = (req, res, next) => {
    const sauceId = req.params.id;
    const userId = req.body.userId;
    const like = req.body.like;
    if (like === 1) {
      Sauce.updateOne(
        { _id: sauceId },
        {
          $inc: { likes: like },
          $push: { usersLiked: userId },
        }
      )
        .then((sauce) => res.status(200).json({ message: "Sauce appréciée" }))
        .catch((error) => res.status(500).json({ error }));
    }
    else if (like === -1) {
      Sauce.updateOne(
        { _id: sauceId },
        {
          $inc: { dislikes: -1 * like },
          $push: { usersDisliked: userId },
        }
      )
        .then((sauce) => res.status(200).json({ message: "Sauce dépréciée" }))
        .catch((error) => res.status(500).json({ error }));
    }
    else {
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            )
              .then((sauce) => {
                res.status(200).json({ message: "Sauce dépréciée" });
              })
              .catch((error) => res.status(500).json({ error }));
          } else if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              {
                $pull: { usersDisliked: userId },
                $inc: { dislikes: -1 },
              }
            )
              .then((sauce) => {
                res.status(200).json({ message: "Sauce appréciée" });
              })
              .catch((error) => res.status(500).json({ error }));
          }
        })
        .catch((error) => res.status(401).json({ error }));
    }
  };
