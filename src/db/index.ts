import { DataSource } from "typeorm"
import User from "../entities/user.entity"
import Task  from "../entities/tasks.entity"

const POSTGRES_HOST = process.env.POSTGRES_HOST
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DB = process.env.POSTGRES_DB

export const  AppDataSource = new DataSource({
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

export const connection = async () => {
  const conn = await AppDataSource.initialize()
  try {
    if(!conn.isInitialized){
      await conn.initialize()
    } 
    console.log('DB connected')
    return conn
    
  } catch (error) {
    console.error('error on DB Connect', error)
  }
}
