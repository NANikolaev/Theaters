const router = require('express').Router();

router.get('/', (req, res) => {
    if (req.user) { res.render('user-home') }
    else { res.render('guest-home') }

})
router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/logout',(req,res)=>{
    res.clearCookie('accessToken')
    res.redirect('/')
})


module.exports = router