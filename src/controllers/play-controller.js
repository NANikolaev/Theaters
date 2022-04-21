const router = require('express').Router()
const { create, deletePlay, getDetails,changePlay } = require('../services/playService');

router.route('/create-theater')
    .get((req, res) => {
        res.render('theater pages/create-theater')
    })
    .post((req, res) => {
        create(req, res)
            .then(play => { res.redirect('/') })
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
    .post((req,res)=>{
       changePlay(req,res)
       .then(play=>res.redirect(`/details/${play._id}`))
      
    })








module.exports = router