// This is an example file to get me used to using the Apollo tool

const {ApolloServer, gql} = require('apollo-server')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # This is a graphql comment inside a Javascript string
    # Apollo let's you use the GraphQL scripting language we learned in the tutorials
    # https://graphql.org/learn/

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String
        author: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
    }
`;

// This is just a test dataset for the purposes of our example — this is the information we will host
// for clients
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin'
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster'
    }
];

// Now let's create a resolver for our book field query
const resolvers = {
    Query: {
        books: () => books,
        /**
         * () => books 
         * is the same as
         * function() {
         *  return books
         * }
         */
    }
};

// Now that we've created our scheme, dataset, and resolvers — let's spin a server for it!
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs, //Our Schema
    resolvers, //Resolvers
    csrfPrevention: true, //Security 
});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})

/**
 * Now we can start the server! 
 * Run the following command in this projects root directory:
 * $ node index.js
 * You should see the following output:
 * $ 🚀 Server ready at http://localhost:4000/
 */
