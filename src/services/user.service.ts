import { AppDataSource } from "../db";
import User from "../entities/user.entity";

const userRepository = AppDataSource.getRepository(User)

export const createUser = async (input: Partial<User>) => {
  return await userRepository.save(userRepository.create(input));
};

export const findUsers = async () => {
  return await userRepository.find()
};