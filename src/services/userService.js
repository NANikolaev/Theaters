const User=require('../models/User');
const jwt=require('jsonwebtoken');
const secret=require('../config/secret');

function register(req,res){
  let body=req.body
    if(body.password != body.repeatPassword){
     throw new Error('Password Missmatch.')
    }
  return  User.create({
        username:body.username,
        password:body.password,
    })
    .then(user=>{
        let payload={
            username:user.username,
            id:user._id
        }
      let token=jwt.sign(payload,secret)
      return token
    })
}

function logIn(req,res){
  return User.find({username:req.body.username})
    .then(user=>{
        let us=user[0]
      let payload={
          username:us.username,
          id:us._id
      }
    let token=jwt.sign(payload,secret,{expiresIn:'1d'})
    return token
   }) 

}

module.exports={register,logIn}