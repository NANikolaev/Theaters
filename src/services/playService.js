const Play=require('../models/Play');

function create(req,res){
 return  Play.create(req.body)
}

module.exports={create}