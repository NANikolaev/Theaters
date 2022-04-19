const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

let userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required.'],
        unique:[true,"Username already exist."]
    },
    password:{
        type:String,
        required:[true,"Password is required."],
    },
    liked:[{type:mongoose.Schema.Types.ObjectId,ref:'Play'}]
})

userSchema.pre('save',function(next){
     bcrypt.hash(this.password,8)
     .then(pass=>{
         this.password=pass
         next()
     })
})

let User=mongoose.model('User',userSchema);

module.exports=User