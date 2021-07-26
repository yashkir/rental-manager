import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Rental, RentalInput } from './typings';
import AddRentalForm from './components/AddRentalForm/AddRentalForm';
import RentalTable from './components/RentalTable/RentalTable';

const ENDPOINT = "/graphql";

function App() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [error, setError] = useState("");

  async function addRental(input: RentalInput) {
    try {
      const res = await axios.post(ENDPOINT, {
        query: `mutation {
          addRental(input: { address: "${input.address}", monthlyRate: ${input.monthlyRate} }) {
            id, address, monthlyRate, available 
          }
        }`
      });
      setRentals(res.data.data.addRental);
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteRental(id: Rental['id']) {
    try {
      const res = await axios.post(ENDPOINT, {
        query: `mutation {
          deleteRental(id: ${id}) {
            id, address, monthlyRate, available 
          }
        }`
      });

      setRentals(res.data.data.deleteRental);
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleAvailableRental(id: Rental['id']) {
    try {
      const res = await axios.post(ENDPOINT, {
        query: `mutation {
          toggleAvailableRental(id: ${id}) {
            id, address, monthlyRate, available 
          }
        }`
      });

      const updatedRental = res.data.data.toggleAvailableRental;
      let newRentals = [...rentals];
      newRentals[rentals.findIndex(r => r.id === updatedRental.id)] = updatedRental;

      setRentals(newRentals);
    } catch (err) {
      setError(err.message);
    }
  }

  async function loadRentals() {
    try {
      const res = await axios.post(ENDPOINT, {
        query: `query {
          rentals {
            id, address, monthlyRate, available
          }
        }`
      });

      setRentals(res.data.data.rentals);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadRentals();
  }, []);

  return (
    <div className="App">
      <h1>Rental Manager</h1>
      <AddRentalForm addRental={addRental} />
      {error ? <div className="App-error">{error}</div> : null }
      <RentalTable
        rentals={rentals}
        deleteRental={deleteRental}
        toggleAvailableRental={toggleAvailableRental}
      />
    </div>
  );
}

export default App;
