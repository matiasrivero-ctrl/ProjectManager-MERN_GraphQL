import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import http from 'http';

export async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const app = express();
  const httpServer = http.createServer(app);

  await server.start();

  app.get('/', (req, res) => {
    res.send('Welcome to my API');
  });

  app.use('/graphql', cors(), express.json(), expressMiddleware(server));

  await new Promise((resolve) =>
    httpServer.listen(
      {
        port: 4000,
      },
      resolve
    )
  ).then(console.log('Server running on: http://localhost:4000/graphql'));
}
