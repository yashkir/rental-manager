import React from 'react';
import { Rental } from '../../typings';
import './RentalTable.css';

export default function RentalTable( { rentals, deleteRental, toggleAvailableRental }:
  {
    rentals: Rental[],
    deleteRental: (id: number) => void,
    toggleAvailableRental: (id: number) => void
  })
{
  return (
    <div className="RentalTable">
      <table>
        <thead className="RentalTable-header" style={{ fontWeight: "bold" }}>
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
