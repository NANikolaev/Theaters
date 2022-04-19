const User=require('../models/User');
const jwt=require('jsonwebtoken');
const secret=require('../config/secret');

function register(req,res){
    let body=req.body
  return  User.create({
        username:body.username,
        password:body.password,
    })
    .then(user=>{
        let payload={
            username:user.username,
            password:user.password
        }
      let token=jwt.sign(payload,secret)
      return token
    })
}

function logIn(req,res){
  return User.find({username:req.body.username})
    .then(user=>{
      let payload={
          username:user.username,
          password:user.password
      }
    let token=jwt.sign(payload,secret)
    return token
   }) 

}

module.exports={register,logIn}