const mongoose = require('mongoose');

const saucesSchema=mongoose.Schema({
userid:{type:String,required:true},
name:{type:String,required:true},
manufacturer:{type:String,required:true},
description:{type:String,require:true},
mainPepper:{type:String,require:true},
imageUrl:{type:String,require:true},
heat:{type:Number,require:true},
likes:{types:Number,required:true},
dislikes:{types:Number,required:true},
usersLiked:{types:["String <userId>"]},
usersDisliked:{types:["String <userId>"]}
});

module.exports=mongoose.model('sauces',saucesSchema)