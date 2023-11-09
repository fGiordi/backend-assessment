import { ApolloServer } from '@apollo/server';
import 'reflect-metadata';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './db';
import { findUsers } from './services/user.service';

// TODO this is dummy data for now
const users = [];
const tasks = [];

AppDataSource.initialize()

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	input TaskFilterInput {
    completed: Boolean
  }

	type User {
		id: ID
		username: String
		email: String
		tasks(filter: TaskFilterInput): [Task]
	}
	
	type Task {
		id: ID
		title: String
		description: String
		completed: Boolean
		user: User
	}
	
	type Query {
		tasks: [Task]
	}
	type Query {
		users: [User]
	}
	
	type Mutation {
		createTask(title: String, description: String, userId: ID): Task
		registerUser(username: String, email: String): User
		deleteTask(id: ID): String
		updateTask(id: ID, title: String, description: String, completed: Boolean): Task
	}
`;

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
  Query: {
    tasks: () => tasks,
    users: async () => {
        try {
          const users = await findUsers();
          return users;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch users from the database.');
      }
    },
  },
  Mutation: {
    createTask: (parent, args) => {
      const { title, description, userId } = args;
      // Create a new task object and add it to the 'tasks' array
      const newTask = {
        id: String(tasks.length + 1),
        title,
        description,
        completed: false,
        user: users.find((user) => user.id === userId),
      };
      tasks.push(newTask);
      return newTask;
    },
    registerUser: (parent, args) => {
			// TODO: email should be unique
      const { username, email, password } = args;
      // Create a new user object and add it to the 'users' array
      const newUser = {
        id: String(users.length + 1),
        username,
        email,
        // password,
        tasks: [],
      };
      users.push(newUser);
      return newUser;
    },
		deleteTask: (parent, args) => {
      const { id } = args;
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) {
        throw new Error("Task not found");
      }
      const deletedTask = tasks[taskIndex];
      tasks.splice(taskIndex, 1);
      return `Task with ID ${id} has been deleted.`;
    },
		updateTask: (parent, args) => {
      const { id, title, description, completed } = args;
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) {
        throw new Error("Task not found");
      }
      const updatedTask = { ...tasks[taskIndex], title, description, completed };
      tasks[taskIndex] = updatedTask;
      return updatedTask;
    },
  },
  User: {
    tasks: (parent) => tasks.filter((task) => task.user.id === parent.id),
  },
  Task: {
    user: (parent) => users.find((user) => user.id === parent.user.id),
  },
}

users.push({ id: "1", username: "user1", email: "user1@example.com", password: "password1", tasks: [] });
users.push({ id: "2", username: "user2", email: "user2@example.com", password: "password2", tasks: [] });
tasks.push({ id: "1", title: "Task 1", description: "Description 1", completed: false, user: users[0] });
tasks.push({ id: "2", title: "Task 2", description: "Description 2", completed: true, user: users[1] });

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then((result) => {
console.log(`🚀  Server ready at: ${result.url}`);

})

