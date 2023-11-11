require('dotenv').config({});

import 'reflect-metadata';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './db';
import { server } from './apollo';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

const PORT = Number(process.env.PORT) 

AppDataSource.initialize() 
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port: PORT},
}).then((result) => {
console.log(`🚀  Server ready at: ${result.url}`);
})


// This final export is important!
export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);