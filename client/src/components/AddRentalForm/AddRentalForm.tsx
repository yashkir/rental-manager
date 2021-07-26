import React, { useRef } from 'react';
import { RentalInput } from '../../typings';

export default function AddRentalForm({ addRental }: { addRental: (input: RentalInput) => void}) {
  const inputAddress = useRef<HTMLInputElement>(null);
  const inputMonthlyRate = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const address = inputAddress.current?.value;
    const monthlyRate = inputMonthlyRate.current?.value;

    if (address && monthlyRate) {
      addRental({address, monthlyRate});
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Address<input type="text" ref={inputAddress} /></label>
        <label>Rate<input type="number" ref={inputMonthlyRate} /></label>
        <button type="submit">Add a Rental</button>
      </form>
    </div>
  );
}
