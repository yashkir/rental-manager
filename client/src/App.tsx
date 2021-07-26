import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ENDPOINT = "/graphql";

type Rental = {
  id: number,
  address: string,
  monthlyRate: number,
  available: boolean,
}

function App() {
  const [rentals, setRentals] = useState<Rental[]>([]);

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
        rentals { id, address, monthlyRate, available }
      }`
    });

    setRentals(res.data.data.rentals);
  }

  useEffect(() => {
    loadRentals();
  }, []);

  return (
    <div className="App">
      <h1>Rentals</h1>
      <table>
        <thead style={{ fontWeight: "bold" }}>
          <tr>
            <td>Address</td>
            <td>Rate</td>
            <td>Available?</td>
            <td>Options</td>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => 
            <tr key={rental.address}>
              <td>{rental.address}</td>
              <td>${rental.monthlyRate}</td>
              <td>{rental.available ? <span>yes</span> : <span>no</span>}</td>
              <td>
                <button onClick={() => deleteRental(rental.id)}>delete</button>
                <button onClick={() => toggleAvailableRental(rental.id)}>toggle available</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
