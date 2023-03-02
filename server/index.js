import { startApolloServer } from './app.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { connectToDatabase } from './db.js';

startApolloServer(typeDefs, resolvers);
connectToDatabase();
