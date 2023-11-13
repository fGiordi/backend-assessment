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

## Example Request 3
- Register User

Testing User query using http client
- create a post request to https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod
- Below is the JSON body
```
{
  "query": "mutation RegisterUser { registerUser(username: \"James Brown\", email: \"jamesbrown@gmail.com\") { id, username, email } }"
}
```

## Example Request 4
- Create a Task
Testing Tasks Query using http client
- create a post request to https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod
- Below is the JSON body

```
"query": "mutation CreateTask { createTask(title: \"Update\", description: \"Description of the task\", userId: \"2\") { id, title, description, completed, user { username, id } } }"
```

## Example Request 5
- Update Task
Testing Update task query using http client
- create a post request to https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod
- Below is the JSON body
```
"query": "mutation UpdateTask{ updateTask(id: \"15\", userId: \"2\", title: \"New Title Whoop Whoop\", description: \"New Description\", completed: true) { id, title, description, completed, user { id, username, email } } }"
```

## Example Request 6
- Delete Task
Testing Delete task query using http client
- create a post request to https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod
- Below is the JSON body
```
  "query": "mutation DeleteTask { deleteTask(id: \"11\", userId: \"1\") }"
```

## Example Request 7
- Find By Status Query
Testing Filter query using http client
- create a post request to https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod
- Below is the JSON body
```
    "query": "query FindTasksByStatus { tasksByStatus(userId: \"id\", completed: true) { id, title, description, completed, user { id, username, email } } }"

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
**Note, the Database is not fully optimised for 100% performance at this point. If you encounter an error when you make a request, please test that the server is still running by testing the hello query and then trying your request again., However all errors are being handled and sent to the user and logs for monitoring**
**Errors are being handled accordingly**
