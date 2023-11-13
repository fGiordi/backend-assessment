# Technical Assignment Brief

## Overview
This technical assignment involves working with a GraphQL API deployed on AWS CDK Lambda functions. The API provides functionality for user registration and task management, backed by a PostgreSQL database and utilizing TypeORM for database interactions. The API is hosted at https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod.

## What is required in this API?
- Fetch Tasks and Users
- Register Users
- Create a task
- Update a Task
- Delete a Task
- Find Task by Status

## Technologies Used
AWS CDK Lambda Functions: The backend is deployed on AWS CDK Lambda functions, offering scalable serverless infrastructure.

PostgreSQL Database: The API uses a PostgreSQL database to persist user and task information.

TypeORM: TypeORM is employed for interacting with the PostgreSQL database, providing a powerful Object-Relational Mapping (ORM) solution.

GraphQL: API is build ontop of Graphql and apollo to query data.

Typescript and Javascript: Type safety is being utilized.


## Queries and Mutations
- All Queries and mutations can be found in the [Front End API Documentation and Guide](./FrontendDocumentation.md)

## Getting Started
- Use your preferred HTTP client tool (e.g., Postman, Insomnia) or integrate the queries and mutations directly into your front-end application.
- Send POST requests to the GraphQL API endpoint https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod.

## How to run locally (optional)
run yarn inside once the repo is cloned
ENV variables to note are  [found here](./example.env)
run yarn dev to start the local server
Once live you can test the apollo server port and start to play around with the graphql
the mutations and queries are found in the [Front End API Documentation and Guide](./FrontendDocumentation.md)


## Testing
To run tests, you can just run 
```
  npm run test
```

## What am I testing?
- hello world query that is deployed to the graphql server
- testing the structure of the data coming back from graph QL, to ensure the format is as expected



## NOTE:
**ALL Requests to the Graph QL API should be a POST REQUEST, even the GET QUERIES**
**Note, the Database is not fully optimised for 100% performance at this point. If you encounter an error when you make a request, please test that the server is still running by testing the hello query and then trying your request again., However all errors are being handled and sent to the user and logs for monitoring**
**Errors are being handled accordingly**

## What is the Hello World Query ?
Testing hello Query using http client (Post man, thunderclient )
- create a post request to https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod
- Below is the JSON body
```
{
  "query": "{hello}"
}
```



Happy coding!


## Serverless Approach Lamda Function
- https://6mjxzacvwc.execute-api.us-east-1.amazonaws.com/

## CDK Deployment LINK
- https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod

