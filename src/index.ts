import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// TODO this is dummy data for now
const books = [
  {
    title: 'The Awakening',
    author: {name: 'Kate Chopin'},
  },
  {
    title: 'City of Glass',
    author: {name: 'Paul Auster'},
  },
];

const authors = [
	{name: 'James Clear'}
]

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	type Author {
		name: String
		books: [Book]
	}

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
	type Query {
		books: [Book]
		authors: [Author]
	}
	type Query {
		authors: [Author]
	}
	type Mutation {
		addBook(title: String, author: String): Book
		updateBook(title: String, newTitle: String, author: String): Book
    deleteBook(title: String, author: String): String
	}
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
		authors: () => authors,
  },
	Mutation: {
    addBook: (parent, args) => {
      const { title, author } = args;
      // Create a new book object and add it to the 'books' array
      const newBook = {
        title,
        author: { name: author },
      };
      books.push(newBook);
      return newBook;
    },
		updateBook: (parent, args) => {
			const { title, newTitle, author } = args;
			const bookIndex = books.findIndex((book) => book.title === title && book.author.name === author);
			if (bookIndex === -1) {
				throw new Error("Book not found");
			}
			const updatedBook = { ...books[bookIndex], title: newTitle };
			books[bookIndex] = updatedBook;
			return updatedBook;
		},
		deleteBook: (parent, args) => {
			const { title, author } = args;
			const bookIndex = books.findIndex((book) => book.title === title && book.author.name === author);
			console.log('bookIndex')
			if (bookIndex) {
				const deletedBook = books[bookIndex];
			books.splice(bookIndex, 1);
			return books
			} else {
				throw new Error("Book not found");
			}
			
		},
  },
	
}


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
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);