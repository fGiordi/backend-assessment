import 'reflect-metadata';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './db';
import { server } from './apollo';

AppDataSource.initialize() 
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then((result) => {
console.log(`🚀  Server ready at: ${result.url}`);
})

