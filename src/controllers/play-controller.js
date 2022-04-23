const router = require('express').Router()
const { create, deletePlay, getDetails,changePlay ,likePlay} = require('../services/playService');

router.route('/create-theater')
    .get((req, res) => {
        res.render('theater pages/create-theater')
    })
    .post((req, res,next) => {
        create(req, res)
            .then(play => { res.redirect('/') })
            .catch(err=>next(err))
    })
router.route('/details/:id')
    .get((req, res) => {
        getDetails(req, res)
            .then(play => res.render('theater pages/theater-details', { play }))
    })

router.get('/delete/:id', (req, res) => {
    deletePlay(req, res)
        .then(play => res.redirect('/'))
})

router.route('/edit/:id')
    .get((req, res) => {
        getDetails(req, res)
        .then(play => res.render('theater pages/edit-theater',{ play }))
    })
    .post((req,res,next)=>{
       changePlay(req,res)
       .then(play=>res.redirect(`/details/${play._id}`))
       // .catch(err=>next(err))
    })

 router.get('/like/:id',(req,res)=>{
        likePlay(req,res)
        .then(play=>{
            res.redirect(`/details/${play._id}`)
       })
 })








module.exports = router