import { AppDataSource } from "../db";
import { Task } from "../entities/tasks.entity";
import User from "../entities/user.entity";

const taskRepository = AppDataSource.getRepository(Task)

export const findTasks = async () => {
  return await taskRepository.find()
};