// server.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ibrahim35640:ibrahim35640@graphql.jjasjaj.mongodb.net/GraphQL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Create Express app
const app = express();

// Apply middleware
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}



 startApolloServer().then(() => {
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
