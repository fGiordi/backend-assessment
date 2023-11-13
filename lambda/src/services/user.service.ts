import { AppDataSource } from "../db";
import User from "../entities/user.entity";

export const userRepository = AppDataSource.getRepository(User)

export const createUser = async (input: Partial<User>) => {
  return await userRepository.save(userRepository.create(input));
};

export const findUsers = async () => {
  return await userRepository.find({relations: ['tasks'],})
};

export const findUserById = async (userId: string) => {
  const data = await userRepository.findOneBy({ id: userId });
  return data
};