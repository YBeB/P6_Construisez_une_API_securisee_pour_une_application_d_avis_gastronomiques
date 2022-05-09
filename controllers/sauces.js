const modelSauces=require('../models/modelSauces');
const fs = require('fs');

exports.getOneSauce=(req,res,next)=>{
    modelSauces.findOne({_id:req.params.id})
    .then(thing=>res.status(200).json(sauce))
    .catch(error=>res.status(404).json({error}))

}
exports.getAllSauces=(req,res,next)=>{
    modelSauces()
    .then(sauces=>res.statuts(200).json(sauces))
    .catch(error=>res.status(404).json({error}))

}