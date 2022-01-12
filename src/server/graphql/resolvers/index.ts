import { AdminMutation } from "./user";
import { EventsQueries, EventsMutations } from "./event";

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
};

export default rootResolver;
