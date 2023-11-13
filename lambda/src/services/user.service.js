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
exports.findUserById = exports.findUsers = exports.createUser = exports.userRepository = void 0;
const db_1 = require("../db");
const user_entity_1 = __importDefault(require("../entities/user.entity"));
exports.userRepository = db_1.AppDataSource.getRepository(user_entity_1.default);
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.userRepository.save(exports.userRepository.create(input));
});
exports.createUser = createUser;
const findUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.userRepository.find({ relations: ['tasks'], });
});
exports.findUsers = findUsers;
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield exports.userRepository.findOneBy({ id: userId });
    return data;
});
exports.findUserById = findUserById;
