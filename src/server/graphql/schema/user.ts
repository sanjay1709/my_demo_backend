import { gql } from 'apollo-server-lambda';
const admin = gql`
  scalar Object

  extend type Query {
    users(offset: Int, limit: Int, search: String):usersFilter
  }

  extend type Mutation {
    adminlogin(email: String!, password: String!): AuthData!
  }

  type usersFilter {
    totalRows:Int
    usersData: [adminData]
  }

  input changeadminPassword{
    oldPassword: String!
    newPassword: String!  
  }

  input UserInput{
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    password: String!
  }

  type responseData {
    status: Boolean
    msg: Object
  }


  type adminData {
    id:Int
    firstName:String
    lastName:String
    userName:String
    email: String
    role: String
  }

  type AuthData {
    status: Boolean
    msg: Object
    firstName:String
    lastName:String
    userName:String
    email: String
    role: String
    token: String
    tokenExpiration: Int
  }
`;

export default admin;
