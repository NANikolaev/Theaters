const homeController=require('../controllers/home-controller')
const userController=require('../controllers/user-controller')




module.exports=(server)=>{
    server.use(homeController);
    server.use(userController);
}
