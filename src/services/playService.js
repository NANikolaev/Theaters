
const Play = require('../models/Play');

function create(req, res) {
    let data=req.body;
    data.creatorId = req.user.id;
    let emptyFields=Array.from(Object.values(data)).includes('') == true
    if(emptyFields){throw new Error('Missed Field/s')}

    return Play.create(req.body)
}

function getDetails(req, res) {
    return Play.findById(req.params.id).lean()
        .then(play => {
            let liked = play.likes.find(p => p == req.user.id)

            if (play.creatorId == req.user.id) {
                res.locals.isOwner = true
            }
            if (play.creatorId != req.user.id && liked) {
                res.locals.isLiked = true

            }
            if (play.creatorId != req.user.id && !liked) {
                res.locals.toLike = true
            }

            return play
        })

}

function deletePlay(req, res) {
    return Play.findByIdAndDelete(req.params.id)
}


function changePlay(req, res) {
    let data = Array.from(Object.values(req.body)).includes('') == false
    if (!data) {
        throw new Error('All fields must be filled')
    }
    if (!req.body.imageUrl.startsWith('https://')) {
        throw new Error('Invalid Url address')
    }
    if (req.body.isPublic == 'on') {
        req.body.isPublic = true
    }
    else{ req.body.isPublic = false }

    return Play.findByIdAndUpdate(req.params.id, req.body)
}

 function likePlay(req, res) {
   return Play.findById(req.params.id)
    .then(play=>{
        play.likes.push(req.user.id)
        return Play.findByIdAndUpdate(play._id,play)        
    })
    
}


module.exports = { create, deletePlay, getDetails, changePlay, likePlay }