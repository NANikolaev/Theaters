const homeController=require('../controllers/home-controller')
const userController=require('../controllers/user-controller')
const playController=require('../controllers/play-controller')



module.exports=(server)=>{
    server.use(homeController);
    server.use(userController);
    server.use(playController);
}
