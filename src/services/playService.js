const { redirect } = require('express/lib/response');
const Play = require('../models/Play');

function create(req, res) {
    req.body.creatorId = req.user.id
    return Play.create(req.body)
}

function getDetails(req, res) {
    return Play.findById(req.params.id).lean()
        .then(play => {
            if (play.creatorId == req.user.id) {
                res.locals.isOwner = true
            }
            if (play.creatorId != req.user.id && play.likes.includes(req.user.id)) {
                res.locals.isLiked = true

            }
            if (play.creatorId != req.user.id && !play.likes.includes(req.user.id)) {
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
    else { req.body.isPublic = false }

    return Play.findByIdAndUpdate(req.params.id, req.body)
}


module.exports = { create, deletePlay, getDetails, changePlay }