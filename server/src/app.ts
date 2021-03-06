import express from 'express';
import path from 'path';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import db, { getNewID } from './db';

const PORT = process.env.PORT || 8080;

const schema = buildSchema(`
  type Rental {
    id: Int!,
    address: String!,
    monthlyRate: Int!,
    available: Boolean!,
  }

  input RentalInput {
    address: String,
    monthlyRate: Int,
  }

  type Query {
    rentals: [Rental!]!
  }

  type Mutation {
    addRental(input: RentalInput): [Rental!]!
    deleteRental(id: Int): [Rental!]!
    toggleAvailableRental(id: Int): Rental!
  }
`);

const root = {
  rentals: () => {
    return db.rentals;
  },
  addRental: ({input}: any) => {
    db.rentals.push({...input, id: getNewID(), available: true});

    return db.rentals;
  },
  deleteRental: ({id}: any) => {
    const idx = db.rentals.findIndex(rental => rental.id === id);
    if (idx != -1) {
      db.rentals.splice(idx, 1);
    }

    return db.rentals;
  },
  toggleAvailableRental: ({id}: any) => {
    const idx = db.rentals.findIndex(rental => rental.id === id);
    if (idx != -1) {
      db.rentals[idx].available = !db.rentals[idx].available;
    }

    return db.rentals[idx];
  }
};

const app = express();

app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.get("/*", function(_req, res) {
  res.sendFile(path.join(__dirname, "..", "..", "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
})
