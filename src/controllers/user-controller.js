const router = require('express').Router();
const { register,logIn } = require('../services/userService');

router.post('/register', (req, res) => {
    register(req, res)
        .then(token => {
            res.cookie('accessToken', token, { httpOnly: true });
            res.redirect('/')
        })
})
router.post('/login',(req,res)=>{
    logIn(req,res)
    .then(token => {
        res.cookie('accessToken', token, { httpOnly: true });
        res.redirect('/')
    })
})

module.exports = router