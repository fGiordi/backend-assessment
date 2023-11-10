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
    tasksByStatus(userId: ID!, completed: Boolean): [Task]
		users: [User]
	}
	
	type Mutation {
		createTask(title: String, description: String, userId: ID): Task
		registerUser(username: String, email: String): User
		deleteTask(id: ID, userId: ID): String
		updateTask(id: ID, userId: ID, title: String, description: String, completed: Boolean): Task
	}
`;

export default typeDefs