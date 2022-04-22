const router = require('express').Router();
const { register,logIn } = require('../services/userService');

router.post('/register', (req, res,next) => {
    register(req, res)
        .then(token => {
            res.cookie('accessToken', token, { httpOnly: true });
            res.redirect('/')
        })
        .catch(err=>next(err))
})
router.post('/login',(req,res,next)=>{
    logIn(req,res)
    .then(token => {
        res.cookie('accessToken', token, { httpOnly: true });
        res.redirect('/')
    })
    .catch(err=>next(err))
})

module.exports = router