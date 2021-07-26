export type Rental = {
  id: number,
  address: string,
  monthlyRate: number,
  available: boolean,
}

export type RentalInput = {
  address: string,
  monthlyRate: string,
}
