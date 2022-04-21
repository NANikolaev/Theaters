const router = require('express').Router()
const { create,deletePlay,getDetails } = require('../services/playService');

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
      getDetails(req,res)
      .then(play=>res.render('theater pages/theater-details',{play}))
    })

router.get('/delete/:id',(req,res)=>{
    deletePlay(req,res)
    .then(play=>res.redirect('/'))
})









module.exports = router