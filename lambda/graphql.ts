// import { server } from "./src/apollo";
import './src/index'
import resolvers from "./src/apollo/resolvers";
import typeDefs from "./src/apollo/schema";

const { ApolloServer, gql } = require("apollo-server-lambda");


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
