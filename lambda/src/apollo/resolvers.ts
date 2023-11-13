// @ts-nocheck

import { findTasks, findTasksByStatus, taskRepository, createTask, deleteTask, updateTask } from "../services/task.service";
import { findUsers, createUser, userRepository } from "../services/user.service";

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  Query: {
    hello: () => 'world',
    tasks: async () => {
      try {
        const tasks = await findTasks();
        return tasks;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch tasks from the database.');
      }
    },
    users: async () => {
      try {
        const users = await findUsers();
        return users;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch users from the database.');
      }
    },
    tasksByStatus: async (parent, args) => {
      const { userId, completed } = args;

      if (completed != undefined) {
        return await findTasksByStatus(userId, completed);
      } else {
        // If completed is not provided, use the existing logic for fetching all tasks
        return await taskRepository.find({ where: { user: { id: userId } } });
      }
    },
  },
  Mutation: {
    createTask: async (parent, args) => {
      try {
        const { title, description, userId } = args;
        const newTask = await createTask({ title, description }, userId);
        return newTask;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create task.');
      }
    },
    registerUser: async (parent, args) => {
      try {
        const { username, email, password } = args;
        const newUser = await createUser({ username, email });
        return newUser;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to register user.');
      }
    },
    deleteTask: async (parent, args) => {
      const { id, userId } = args;

      try {
        const result = await deleteTask(id, userId);
        return result;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete task.');
      }
    },
    updateTask: async (parent, args) => {
      const { id, userId, title, description, completed } = args;

      try {
        const input = { title, description, completed };
        const result = await updateTask(id, userId, input);
        return result;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update task.');
      }
    },
  },

  User: {
    tasks: async (parent) => {
      // If tasks are eagerly loaded, return them directly
      if (parent.tasks) {
        return parent.tasks;
      }

      // If tasks are not eagerly loaded, fetch them from the repository
      const user = await userRepository.findOne(parent.id);
      return user ? user.tasks : [];
    },
  },
  Task: {
    user: async (parent) => {
      // If the user is not loaded automatically, fetch it by ID
      if (!parent.user) {
        return await userRepository.findOne(parent.userId);
      }
      return parent.user;
    },
  },
}
export default resolvers



