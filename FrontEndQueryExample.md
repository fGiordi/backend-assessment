### Example API Call from Front End
The following is an example of how you are going to call the API from the front end
```
const axios = require('axios');

const graphqlEndpoint = 'https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod';

async function sendGraphQLQuery(query) {
  try {
    const response = await axios.post(
      graphqlEndpoint,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Example query
const query = `
  query {
    hello
  }
`;

// Send the query
sendGraphQLQuery(query);
```