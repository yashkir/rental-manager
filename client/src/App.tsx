import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ENDPOINT = "/graphql";

type Rental = {
  address: string,
  monthlyRate: number,
  available: boolean,
}

function App() {
  const [rentals, setRentals] = useState<Rental[]>([]);

  useEffect(() => {
    const payload = {
      query: `{
        rentals { address, monthlyRate, available }
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
        <thead>
          <tr>
            <td>Address</td>
            <td>Rate</td>
            <td>Available?</td>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => 
            <tr key={rental.address}>
              <td>{rental.address}</td>
              <td>${rental.monthlyRate}</td>
              <td>{rental.available ? <span>yes</span> : <span>no</span>}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
