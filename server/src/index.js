const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

// define graphQl schema
const typeDefs = `
type Query {
  info: String!
  feed: [Link]!
}

type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

// 2 add resolver for field
const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => links,
  },

  // Parent is result of parent resolver -> one elemenf from links list in this case, this implementation can be omitted
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

// 3 start server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
