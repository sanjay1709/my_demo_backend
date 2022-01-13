## NodeJS App with GraphQL and PostgreSQL backend

This Code is part of a CRUD operation for an event.

## Pre-requisites

Install NodeJS from https://nodejs.org

Install PostgreSQL

Install pgAdmin 4

## Installation

`git clone https://github.com/sanjay1709/my_demo_backend.git`

`cd my_demo_backend`

`npm install`

Create a database named demo in your Postgres DB Server

Edit .env.development file to add database details
`DB_USER=postgres DB_PASS=admin DB_NAME=demo`

`npm install serverless`

`serverless offline start`

Visit `localhost:3000/dev/graphql` for GraphQL playground
