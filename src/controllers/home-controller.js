const router = require('express').Router();
const { top3, allPlays } = require('../services/homeService')
router.get('/', (req, res) => {
    if (req.user) {
        allPlays()
            .then(plays => res.render('user-home', { plays }))
    }
    else {
        top3()
            .then(plays => res.render('guest-home', { plays }))
    }

})
router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/logout', (req, res) => {
    res.clearCookie('accessToken')
    res.redirect('/')
})


module.exports = router