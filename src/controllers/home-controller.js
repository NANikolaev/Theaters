const router=require('express').Router();

router.get('/',(req,res)=>{
    if(!req.user){
        res.render('guest-home')
    }

})
router.get('/register',(req,res)=>{
    res.render('register')
})
router.get('/login',(req,res)=>{
    res.render('login')
})


module.exports=router