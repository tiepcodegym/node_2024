import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/Post"
import { User } from "./entity/User"
import 'dotenv/config';
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST_NAME,
    port: 3306,
    username: "root",
    password: null,
    database: "typeorm_test",
    synchronize: true,
    logging: false,
    entities: [Post,User],
    migrations: [],
    subscribers: [],
})