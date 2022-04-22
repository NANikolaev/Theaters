const server=require('express')();
const PORT=3000;

require('./src/config/database')();
require('./src/config/express')(server);
require('./src/middlewares/middlewares')(server);
require('./src/config/routes')(server);
require('./src/middlewares/errorHandler')(server)



server.listen(PORT,()=>console.log('Server is listening on port',PORT))