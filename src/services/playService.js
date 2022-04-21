const { redirect } = require('express/lib/response');
const Play=require('../models/Play');

function create(req,res){
    req.body.creatorId=req.user.id
     return  Play.create(req.body)
}

function getDetails(req,res){
    return Play.findById(req.params.id).lean()
    .then(play=>{
          if(play.creatorId == req.user.id){
              res.locals.isOwner=true
          }
          if(play.creatorId != req.user.id && play.likes.includes(req.user.id)){
              res.locals.isLiked=true
              
          }
          if(play.creatorId != req.user.id && !play.likes.includes(req.user.id)){
            res.locals.toLike=true
          }
          return play
    })

}

function deletePlay(req,res){
   return Play.findByIdAndDelete(req.params.id)
}



module.exports={create,deletePlay,getDetails}