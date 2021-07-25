import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import db from './db';

const PORT = 8080;

const schema = buildSchema(`
  type Rental {
    address: String!,
    monthlyRate: Int!,
    available: Boolean!,
  }

  type Query {
    rentals: [Rental!]!
  }
`);

const root = {
  rentals: () => {
    return db.rentals;
  }
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.get('/', (_req, res) => res.send("This is a GraphQL server. Use the /graphql endpoint."));

app.listen(PORT, () => {
  `running on ${PORT}`;
})
