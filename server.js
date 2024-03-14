// server.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/graphql-crud', {
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
server.applyMiddleware({ app });

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
