require('dotenv').config()
const express = require('express')
const app = express()
const webRoutes=require('./routes/web')
const initAPIRoute=require('./routes/api')
const AuthRoute=require('./routes/auth_router')
const connectDB = require( './config/connectDB');
const configViewEngine = require('./config/viewEngine');
const bodyParser = require('body-parser');


configViewEngine(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(webRoutes);
app.use('/api',initAPIRoute);
app.use(AuthRoute);


connectDB();
const port=process.env.PORT;
const hostname=process.env.HOST_NAME;
app.listen(port,hostname,() => {
    console.log(`Example app listening on port ${port}`)
})