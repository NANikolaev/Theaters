const jwt=require('jsonwebtoken');
const secret=require('../config/secret');
const url=require('url');

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

//function errorHandle()

module.exports=(server)=>{
   server.use(ifLogged)
}