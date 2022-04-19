const mongoose=require('mongoose');
const User=require('./User');

let playSchema=new mongoose.Schema({
     title:{
         type:String,
         required:[true,"Require Title"],
         unique:[true,'Title already exist'],
     },
     description:{
         type:String,
         required:[true,"Description is required."],
         maxlength:[50,'Description must be maximum 50 characters long'],
     },
     image:{
         type:String,
         required:[true,"Image URL is required"]
     },
     isPublic:false,
     created:{
         type:String,
         required:[true,'Required date of creation']
     },
     likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]

})

let Play=mongoose.model('Play',playSchema)
module.exports=Play