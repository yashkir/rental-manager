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

  function deleteRental(id: Rental['id']) {
    const payload = {
      query: `mutation {deleteRental(id: ${id}) { id, address, monthlyRate, available }}`
    };
    axios.post(ENDPOINT, payload)
      .then(res => {
        setRentals(res.data.data.deleteRental);
      });
  }

  function toggleAvailableRental(id: Rental['id']) {
    return;
  }

  useEffect(() => {
    const payload = {
      query: `{
        rentals { id, address, monthlyRate, available }
      }`
    };

    axios.post(ENDPOINT, payload)
      .then(res => {
        setRentals(res.data.data.rentals);
      });
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
