const url=require('url');

function errorHandler(error,req,res,next){
    let path=url.parse(req.url).pathname
    if(!error.errors){
        res.locals.errors=[error.message]
        res.redirect(path)
    }
    res.locals.errors=Array.from(Object.keys(error.errors).map(er=>error.errors[er].message))
    res.redirect(path)
}

module.exports=(server)=>{
    server.use(errorHandler)
}