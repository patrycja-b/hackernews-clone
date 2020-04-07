const { GraphQLServer } = require("graphql-yoga");

// define graphQl schema
const typeDefs = `
type Query {
  info: String!
}
`;

// 2 add resolver for field
const resolvers = {
  Query: {
    info: () => "api info",
  },
};

// 3 start server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
