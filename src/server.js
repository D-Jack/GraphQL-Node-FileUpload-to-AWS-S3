// src/server.js -- final revision

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

const express=require("express");
const {
    graphqlUploadExpress, // A Koa implementation is also exported.
  } = require('graphql-upload');
async function startServer() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await server.start();
  
    const app = express();
  
    // This middleware should be added before calling `applyMiddleware`.
    app.use(graphqlUploadExpress());
  
    server.applyMiddleware({ app });
  
    await new Promise(r => app.listen({ port: 4000 }, r));
  
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }
  startServer();