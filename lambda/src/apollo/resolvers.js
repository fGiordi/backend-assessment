"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("../services/task.service");
const user_service_1 = require("../services/user.service");
// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
        hello: () => 'world',
        tasks: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const tasks = yield (0, task_service_1.findTasks)();
                return tasks;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to fetch tasks from the database.');
            }
        }),
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield (0, user_service_1.findUsers)();
                return users;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to fetch users from the database.');
            }
        }),
        tasksByStatus: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId, completed } = args;
            if (completed != undefined) {
                return yield (0, task_service_1.findTasksByStatus)(userId, completed);
            }
            else {
                // If completed is not provided, use the existing logic for fetching all tasks
                return yield task_service_1.taskRepository.find({ where: { user: { id: userId } } });
            }
        }),
    },
    Mutation: {
        createTask: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { title, description, userId } = args;
                const newTask = yield (0, task_service_1.createTask)({ title, description }, userId);
                return newTask;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to create task.');
            }
        }),
        registerUser: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { username, email, password } = args;
                const newUser = yield (0, user_service_1.createUser)({ username, email });
                return newUser;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to register user.');
            }
        }),
        deleteTask: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, userId } = args;
            try {
                const result = yield (0, task_service_1.deleteTask)(id, userId);
                return result;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to delete task.');
            }
        }),
        updateTask: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, userId, title, description, completed } = args;
            try {
                const input = { title, description, completed };
                const result = yield (0, task_service_1.updateTask)(id, userId, input);
                return result;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to update task.');
            }
        }),
    },
    User: {
        tasks: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            // If tasks are eagerly loaded, return them directly
            if (parent.tasks) {
                return parent.tasks;
            }
            // If tasks are not eagerly loaded, fetch them from the repository
            const user = yield user_service_1.userRepository.findOne(parent.id);
            return user ? user.tasks : [];
        }),
    },
    Task: {
        user: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            // If the user is not loaded automatically, fetch it by ID
            if (!parent.user) {
                return yield user_service_1.userRepository.findOne(parent.userId);
            }
            return parent.user;
        }),
    },
};
exports.default = resolvers;
