const mongoose = require('mongoose');

const sauceSchema=mongoose.Schema({
userId:{type:String,required:true},
name:{type:String,required:true},
manufacturer:{type:String,required:true},
description:{type:String,require:true},
mainPepper:{type:String,require:true},
imageUrl:{type:String,require:true},
heat:{type:Number,require:true},
likes: { type: Number, default: 0 },
dislikes: { type: Number, default: 0 },
usersLiked:{types:[String]},
usersDisliked:{types:[String]}
});

module.exports=mongoose.model('Sauce',sauceSchema)