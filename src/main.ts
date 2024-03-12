import * as dotenv from 'dotenv';
dotenv.config();
import {AppDataSource} from "./data-source";
import * as express from 'express';
import "reflect-metadata"
import postRoutes from './routes/post';
import api2Router from './routes/api2';
import * as bodyParser from 'body-parser';

//init express app
const app = express();
app.use(express.json());
//for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

// Kết nối CSDL
AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database')
    })
    .catch((error) => {
        console.log('Connect db error: ' + error)
    });

// Sử dụng body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cấu hình các định tuyến
//load api routes
// app.use('/',AuthRoute);
// app.use('/api', initAPIRoute);
app.use(postRoutes);
app.use(api2Router);



// Khởi chạy server
const port=process.env.PORT;
const hostname=process.env.HOST_NAME;
app.listen(port,hostname,() => {
    console.log(`Example app listening on port ${port}`)
})