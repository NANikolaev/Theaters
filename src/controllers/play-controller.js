const router = require('express').Router()
const { create } = require('../services/playService');

router.route('/create-theater')
    .get((req, res) => {
        res.render('theater pages/create-theater')
    })
    .post((req, res) => {
        create(req, res)
            .then(play => {res.redirect('/')})
    })







module.exports = router