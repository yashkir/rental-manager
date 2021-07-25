import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import db from './db';

const PORT = 8080;

const schema = buildSchema(`
  type Rental {
    id: Int!,
    address: String!,
    monthlyRate: Int!,
    available: Boolean!,
  }

  type Query {
    rentals: [Rental!]!
  }

  type Mutation {
    deleteRental(id: Int): [Rental!]!
  }
`);

const root = {
  rentals: () => {
    return db.rentals;
  },
  deleteRental: ({id}: any) => {
    const idx = db.rentals.findIndex(rental => rental.id === id);
    if (idx != -1) {
      db.rentals.splice(idx, 1);
    }

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
