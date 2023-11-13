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
 
## Example Request 1
- Testing hello Query with terminal
```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod' \
  --data '{"query":"query { hello }"}'
```
Testing hello Query using http client
- create a post request to https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod
- Below is the JSON body
```
{
  "query": "{hello}"
}
```

## Example Request 2
- Testing Tasks Query
```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod' \
  --data '{"query":"query { tasks {title, id, description}}"}'
```
Testing Tasks Query using http client
- create a post request to https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod
- Below is the JSON body
```
{
  "query": "{ tasks { id, description, completed } } "
}
```


## Authentication 
Currently, the API doesn't use JWT for authentication. Make sure to handle user authentication and authorization on the front end as needed.

## Queries and Mutations
1. Register a User
```
mutation RegisterUser($username: String!, $email: String!) {
  registerUser(username: $username, email: $email) {
    id
    username
    email
  }
}
```
2. Create a Task
```
mutation CreateTask($userId: ID!, $title: String!, $description: String, $completed: Boolean) {
  createTask(userId: $userId, title: $title, description: $description, completed: $completed) {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```
3. Edit a Task
```
mutation EditTask($taskId: ID!, $title: String, $description: String, $completed: Boolean) {
  editTask(taskId: $taskId, title: $title, description: $description, completed: $completed) {
    id
    title
    description
    completed
    updatedAt
  }
}
```
4. Delete a Task
```
mutation DeleteTask($taskId: ID!) {
  deleteTask(taskId: $taskId)
}
```
5. Filter by Status
```
query FilterTasksByStatus($completed: Boolean!) {
  tasks(completed: $completed) {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```


## NOTE:
**ALL Requests to the Graph QL API should be a POST REQUEST, even the GET QUERIES**