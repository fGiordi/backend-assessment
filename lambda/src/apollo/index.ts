// The ApolloServer constructor requires two parameters: your schema

import { ApolloServer } from "@apollo/server";
import resolvers  from "./resolvers";
import typeDefs  from "./schema";

// definition and your set of resolvers.
export const server = new ApolloServer({
  typeDefs,
  resolvers,
});