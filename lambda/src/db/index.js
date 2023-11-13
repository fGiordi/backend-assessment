"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = __importDefault(require("../entities/user.entity"));
const tasks_entity_1 = __importDefault(require("../entities/tasks.entity"));
const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;
exports.AppDataSource = new typeorm_1.DataSource({
    entities: [user_entity_1.default, tasks_entity_1.default],
    synchronize: true,
    logging: false,
    "type": "postgres",
    "host": POSTGRES_HOST,
    "port": 5432,
    "username": POSTGRES_USER,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRES_DB,
});
exports.AppDataSource.initialize()
    .then((data) => {
    // here you can start to work with your database
    console.log('DB connected');
})
    .catch((error) => console.log(error));
