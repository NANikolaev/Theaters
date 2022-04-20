
const Play=require('../models/Play');

  function top3(){
    return Play.find({}).lean()
          .then(plays=>{
              let all=plays.slice(0,4)
              all=all.sort((a,b)=>b.likes.length-a.likes.length)
              return all
          })
}

function allPlays(){
    return Play.find({}).lean()
        .then(plays=>{
            return plays
        })

}
module.exports={top3,allPlays}