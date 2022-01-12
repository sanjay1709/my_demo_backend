import { GraphQLUpload } from 'graphql-upload';
import { AdminMutation } from './admin';
import { EventsQueries, EventsMutations } from './event';

const rootResolver = {
  Query: {
    ...EventsQueries,
    // Add other queries here
  },
  Mutation: {
    ...AdminMutation,
    ...EventsMutations,
    // Add other mutations here
  },

  Upload: GraphQLUpload,
};

export default rootResolver;
