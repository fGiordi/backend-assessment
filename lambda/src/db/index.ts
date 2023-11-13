//@ts-nocheck

import { DataSource } from "typeorm"
import User from "../entities/user.entity"
import Task  from "../entities/tasks.entity"

const POSTGRES_HOST = process.env.POSTGRES_HOST
const POSTGRES_USER= process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DB = process.env.POSTGRES_DB

export const AppDataSource = new DataSource({
  entities: [User, Task],
  synchronize: true,
  logging: false,
  "type": "postgres",
  "host": POSTGRES_HOST,
  "port": 5432,
  "username": POSTGRES_USER,
  "password": POSTGRES_PASSWORD,
  "database": POSTGRES_DB,
})

AppDataSource.initialize()
  .then((data) => {
    // here you can start to work with your database
    console.log('DB connected')
  })
  .catch((error) => console.log(error))