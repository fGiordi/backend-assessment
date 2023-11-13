# Backend GraphQL API Documentation

## Introduction

- Welcome to the documentation for the GraphQL API. This API allows you to perform various operations related to user registration and task management.

## Base URL
The base URL for the GraphQL API is: https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod

## Getting Started
 To interact with the GraphQL API, you need to send GraphQL queries and mutations. Below are some sample queries and mutations that you can use.

## Example Query
The following example query retrieves tasks along with their IDs, and users with their IDs, usernames, and emails.

```
query ExampleQuery {
  tasks {
    id
  }
  users {
    id,
    username,
    email
  }
}
```
To send this query to the API, you can use your preferred HTTP client, such as [POSTMAN](https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode)
 or [THUNDERCLIENT](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client), or include it in your front-end code using a library like Apollo Client.
 