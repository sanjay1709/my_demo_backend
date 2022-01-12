import { ApolloServer } from 'apollo-server-lambda';
import schema from './server/graphql/schema';
const express = require('express');
import auth from './server/middleware/auth';

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  context: ({ event, context, express }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    expressRequest: express.req,
  }),
});

export const graphqlHandler = apolloServer.createHandler(
  {
    expressGetMiddlewareOptions: {
      disableHealthCheck: true,
    },
    expressAppFromMiddleware(middleware) {
      const app = express();
      app.use(auth);
      app.use(middleware);
      return app;
    }
  }
);