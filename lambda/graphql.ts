import './src/index'
import resolvers from "./src/apollo/resolvers";
import typeDefs from "./src/apollo/schema";

const { ApolloServer} = require("apollo-server-lambda");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
