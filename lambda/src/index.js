"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlHandler = void 0;
require('dotenv').config({});
require("reflect-metadata");
const db_1 = require("./db");
const apollo_1 = require("./apollo");
const aws_lambda_1 = require("@as-integrations/aws-lambda");
const PORT = Number(process.env.PORT);
db_1.AppDataSource.initialize();
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
// startStandaloneServer(server, {
//   listen: { port: PORT},
// }).then((result) => {
// console.log(`🚀  Server ready at: ${result.url}`);
// })
// This final export is important!
exports.graphqlHandler = (0, aws_lambda_1.startServerAndCreateLambdaHandler)(apollo_1.server, 
// We will be using the Proxy V2 handler
aws_lambda_1.handlers.createAPIGatewayProxyEventV2RequestHandler());
