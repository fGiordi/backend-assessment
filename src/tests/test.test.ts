import { expect } from 'chai';
import { describe, it } from 'mocha';
import axios from 'axios';

const graphqlEndpoint = 'https://p3xyeb9kt4.execute-api.eu-north-1.amazonaws.com/prod';

describe('GraphQL Queries', function () {
  it('should return "world" for the "hello" query', async function () {
    const query = `
      query {
        hello
      }
    `;

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

      // Check if the response contains the expected result
      expect(response.data.data.hello).to.equal('world');
    } catch (error) {
      // If there is an error, fail the test
      throw error;
    }
  });

  it('should return the expected format', async function () {
    const query = `
      query ExampleQuery {
        users {
          username
        }
      }
    `;

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

      // Check if the response contains the expected structure
      expect(response.data).to.have.property('data')

      console.log('response.data', response.data)


    } catch (error) {
      throw error;
    }
  });
});


