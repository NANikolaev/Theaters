const jwt=require('jsonwebtoken');
const secret=require('../config/secret');

function ifLogged(req,res,next){
    if(req.cookies['accessToken']){
        let token=req.cookies['accessToken']
        jwt.verify(token,secret,(err,user)=>{
            req.user=user
            res.locals.user=true
        })      
    }
    next()
}

module.exports=(server)=>{
   server.use(ifLogged)
}