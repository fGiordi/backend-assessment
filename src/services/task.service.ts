import { AppDataSource } from "../db";
import  Task  from "../entities/tasks.entity";
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

	return data
};

export const deleteTask = async (taskId: string, userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  const task = await taskRepository.findOne({where: {id: taskId}, relations: ['user']})

  if (!task) {
    throw new Error(`Task with ID ${taskId} not found.`);
  }

  if (task.user.id != userId) {
    throw new Error(`Task with ID ${taskId} does not belong to user with ID ${userId}.`);
  }

  await taskRepository.remove(task);

  console.log(`Deleted task with ID ${taskId}`);

  return `Task with ID ${taskId} has been deleted.`;
};

export const updateTask = async (taskId: string, userId: string, input: Partial<Task>) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  const task = await taskRepository.findOne({where: {id: taskId}, relations: ['user']} );

  if (!task) {
    throw new Error(`Task with ID ${taskId} not found.`);
  }

  if (task.user.id != userId) {
    throw new Error(`Task with ID ${taskId} does not belong to user with ID ${userId}.`);
  }

  // Update task properties
  task.title = input.title || task.title;
  task.description = input.description || task.description;
  task.completed = input.completed != undefined ? input.completed : task.completed;

  const updatedTask = await taskRepository.save(task);

  console.log(`Updated task with ID ${taskId}`);

  return updatedTask;
};

export const findTasksByStatus = async (userId: string, completed: boolean | undefined): Promise<Task[]> => {
  const queryOptions: any = {
    where: {
      user: { id: userId },
    },
    relations: ['user']
  };

  if (completed != undefined) {
    queryOptions.where.completed = completed;
  }

  return await taskRepository.find(queryOptions);
};