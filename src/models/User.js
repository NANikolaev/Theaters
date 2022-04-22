const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const Play=require('./Play');
let userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required.'],
        unique:[true,"Username already exist."],
        minlength:[3,'Username should be at least 3 characters long.'],
        validate:[/[a-zA-Z0-9]+/,'Username should include only English letters and digits.'],
    },
    password:{
        type:String,
        required:[true,"Password is required."],
        minlength:[3,'Password should be at least 3 characters long.'],
        validate:[/[a-zA-Z0-9]+/,'Password should include only English letters and digits.'],
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