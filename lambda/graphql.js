"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { server } from "./src/apollo";
require("./src/index");
const resolvers_1 = __importDefault(require("./src/apollo/resolvers"));
const schema_1 = __importDefault(require("./src/apollo/schema"));
const { ApolloServer, gql } = require("apollo-server-lambda");
const server = new ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
});
exports.handler = server.createHandler();
