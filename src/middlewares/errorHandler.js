const url = require('url');

function errorHandler(error, req, res, next) {
    let path = url.parse(req.url).pathname
    if (!error.errors) {
        res.cookie('errors', [error.message], { maxAge: '1000' })
        res.redirect(path)
    }
    else {
        let errors = Array.from(Object.keys(error.errors).map(er => error.errors[er].message))
        res.cookie('errors', errors, { maxAge: '1000' })
        res.redirect(path)
    }

}

module.exports = (server) => {
    server.use(errorHandler)
}