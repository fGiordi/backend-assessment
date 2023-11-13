"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTasksByStatus = exports.updateTask = exports.deleteTask = exports.createTask = exports.findTasks = exports.taskRepository = void 0;
const db_1 = require("../db");
const tasks_entity_1 = __importDefault(require("../entities/tasks.entity"));
const user_service_1 = require("./user.service");
exports.taskRepository = db_1.AppDataSource.getRepository(tasks_entity_1.default);
const findTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.taskRepository.find({ relations: ['user'] });
});
exports.findTasks = findTasks;
const createTask = (input, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.findUserById)(userId);
    if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
    }
    const data = yield exports.taskRepository.save(exports.taskRepository.create(Object.assign(Object.assign({}, input), { user })));
    return data;
});
exports.createTask = createTask;
const deleteTask = (taskId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.findUserById)(userId);
    if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
    }
    const task = yield exports.taskRepository.findOne({ where: { id: taskId }, relations: ['user'] });
    if (!task) {
        throw new Error(`Task with ID ${taskId} not found.`);
    }
    if (task.user.id != userId) {
        throw new Error(`Task with ID ${taskId} does not belong to user with ID ${userId}.`);
    }
    yield exports.taskRepository.remove(task);
    console.log(`Deleted task with ID ${taskId}`);
    return `Task with ID ${taskId} has been deleted.`;
});
exports.deleteTask = deleteTask;
const updateTask = (taskId, userId, input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.findUserById)(userId);
    if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
    }
    const task = yield exports.taskRepository.findOne({ where: { id: taskId }, relations: ['user'] });
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
    const updatedTask = yield exports.taskRepository.save(task);
    console.log(`Updated task with ID ${taskId}`);
    return updatedTask;
});
exports.updateTask = updateTask;
const findTasksByStatus = (userId, completed) => __awaiter(void 0, void 0, void 0, function* () {
    const queryOptions = {
        where: {
            user: { id: userId },
        },
        relations: ['user']
    };
    if (completed != undefined) {
        queryOptions.where.completed = completed;
    }
    return yield exports.taskRepository.find(queryOptions);
});
exports.findTasksByStatus = findTasksByStatus;
