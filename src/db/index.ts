import { DataSource } from "typeorm"
import User from "../entities/user.entity"
import { Task } from "../entities/tasks.entity"

export const AppDataSource = new DataSource({
  entities: [User, Task],
  synchronize: true,
  logging: false,
  "type": "postgres",
  "host": "127.0.0.1",
  "port": 1234,
  "username": "postgres",
  "password": "admin",
  "database": "taskmanager",
})

AppDataSource.initialize()
  .then((data) => {
    // here you can start to work with your database
    console.log('DB connected')
  })
  .catch((error) => console.log(error))