import { AppDataSource } from "../db";
import { Task } from "../entities/tasks.entity";
import User from "../entities/user.entity";
import { findUserById } from "./user.service";

export const taskRepository = AppDataSource.getRepository(Task)

export const findTasks = async () => {
  return await taskRepository.find({relations: ['user']})
};

export const createTask = async (input: Partial<Task>, userId: string) => {
	const user = await findUserById(userId);

  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }
  const data = await taskRepository.save(taskRepository.create({ ...input, user }));

  console.log('created task', data)

	return data
};