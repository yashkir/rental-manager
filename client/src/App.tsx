import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import { Rental, RentalInput } from './typings';
import AddRentalForm from './components/AddRentalForm/AddRentalForm';
import RentalTable from './components/RentalTable/RentalTable';

const ENDPOINT = "/graphql";

function App() {
  const [rentals, setRentals] = useState<Rental[]>([]);

  async function addRental(input: RentalInput) {
    const res = await axios.post(ENDPOINT, {
      query: `mutation {
        addRental(input: { address: "${input.address}", monthlyRate: ${input.monthlyRate} }) {
          id, address, monthlyRate, available 
        }
      }`
    });

    setRentals(res.data.data.addRental);
  }

  async function deleteRental(id: Rental['id']) {
    const res = await axios.post(ENDPOINT, {
      query: `mutation {
        deleteRental(id: ${id}) {
          id, address, monthlyRate, available 
        }
      }`
    });

    setRentals(res.data.data.deleteRental);
  }

  async function toggleAvailableRental(id: Rental['id']) {
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
  }

  async function loadRentals() {
    const res = await axios.post(ENDPOINT, {
      query: `{
        rentals {
          id, address, monthlyRate, available
        }
      }`
    });

    setRentals(res.data.data.rentals);
  }

  useEffect(() => {
    loadRentals();
  }, []);

  return (
    <div className="App">
      <h1>Rental Manager</h1>
      <AddRentalForm addRental={addRental} />
      <RentalTable
        rentals={rentals}
        deleteRental={deleteRental}
        toggleAvailableRental={toggleAvailableRental}
      />
    </div>
  );
}

export default App;
