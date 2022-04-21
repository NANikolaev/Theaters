const mongoose=require('mongoose');
const User=require('./User');

let playSchema=new mongoose.Schema({
     title:{
         type:String,
         required:[true,"Require Title"],
         unique:[true,'Title already exist'],
     },
     description:{
         type:String,
         required:[true,"Description is required."],
         maxlength:[50,'Description must be maximum 50 characters long'],
     },
     imageUrl:{
         type:String,
         required:[true,"Image URL is required"]
     },
     isPublic:false,
     created:{
         type:String,
         required:[true,'Required date of creation']
     },
      creatorId:{
          type:String,
          required:true
      },
     likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
     

})

playSchema.pre('save',function(next){
    if(this.isPublic == 'on'){
        this.isPublic=true
    }
    else{this.isPublic=false}
    next()
})
playSchema.pre('validate',function(next){
     let calendar=new Date('April 19, 2022 20:54:00  GMT+00:00');
     this.created=`${calendar.getDate()}/${calendar.getMonth()+1}/${calendar.getFullYear()}/time: ${calendar.toLocaleTimeString('it-IT')}`
    next()
})

let Play=mongoose.model('Play',playSchema)
module.exports=Play