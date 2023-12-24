import { Address } from "../Common/Address";

export class CustomerAddress extends Address {
  constructor(
    building: string,
    street: string,
    locality: string,
    city: string,
    zipcode: string,
    landmark?: string,
    instructions?: string
  ) {
    super(building, street, locality, city, zipcode, landmark, instructions);
  }
}
