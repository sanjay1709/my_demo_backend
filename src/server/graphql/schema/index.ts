import { gql } from "apollo-server-lambda";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "../resolvers/index";
import user from "./user";
import event from "./events";

const types = [user, event];
const upload = gql`
  scalar Upload
`;
const date = gql`
  scalar Date
`;
const Query = gql`
  type Query {
    _empty: String
  }
`;
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;
const Subscription = gql`
  type Subscription {
    _empty: String
  }
`;
const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, Subscription, ...types, upload, date],
  resolvers,
});
export default schema;
