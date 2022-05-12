const mongoose = require('mongoose');

const sauceSchema=mongoose.Schema({
userid:{type:String,required:true},
name:{type:String,required:true},
manufacturer:{type:String,required:true},
description:{type:String,require:true},
mainPepper:{type:String,require:true},
imageUrl:{type:String,require:true},
heat:{type:Number,require:true},
likes:{types:Number},
dislikes:{types:Number},
usersLiked:{types:[String]},
usersDisliked:{types:[String]}
});

module.exports=mongoose.model('Sauce',sauceSchema)