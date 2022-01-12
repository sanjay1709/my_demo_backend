import { gql } from 'apollo-server-lambda';

const event = gql`

  extend type Query {
    events(offset: Int, limit: Int, search: String):eventsFilter
  }

  extend type Mutation {
    addEvent(event:event) : responseEvent!
    deleteEvent(eventID:Int!) : responseData!
    updateEvent(eventID:ID!, event:event) : responseEvent!
  }

  type events {
    id: ID
    name: String!
    description: String!  
    date: Date
    organizer: String!
  }

  type responseEvent {
    status: Boolean
    msg: Object
    events: events
  }

  type eventsFilter {
    totalRows:Int
    eventsData: [events]
  }

  input event {
    name: String!
    description: String
    date: Date
    organizer:String
  }

`;

export default event;