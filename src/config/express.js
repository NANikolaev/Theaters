const express=require('express');
const handlebars=require('express-handlebars');
const hbs=handlebars.create({extname:"hbs"})

module.exports=(server)=>{
    server.use(express.static('./src/static'));
    server.use(express.urlencoded());
    server.engine('hbs',hbs.engine);
    server.set('view engine','hbs');
    server.set('views','./src/views');
}