import { CustomerAddress } from "../CustomerAddress";

describe('CustomerAddress - ValueType - Test Suite', () => {
  it('should create a instance of Customer Address', () => {
    const address = new CustomerAddress('Icon Dreams - 202', 'Jublli Gardens #5', 'kondapur', 'hyderabad', "500084", "Behind Harsha Toyota", "Come to dead end of the street.");

    expect(address).toBeInstanceOf(CustomerAddress);
    expect(address.toBaseAddress()).toBeDefined();
  });

  it('should create a instance of Customer Address', () => {
    const address = new CustomerAddress('Icon Dreams - 202', 'Jublli Gardens #5', 'kondapur', 'hyderabad', "500084", "Behind Harsha Toyota");

    expect(address).toBeInstanceOf(CustomerAddress);
    expect(address.toBaseAddress()).toBeDefined();
  });

  it('should create a instance of Customer Address', () => {
    const address = new CustomerAddress('Icon Dreams - 202', 'Jublli Gardens #5', 'kondapur', 'hyderabad', "500084");

    expect(address).toBeInstanceOf(CustomerAddress);
    expect(address.toBaseAddress()).toBeDefined();
  });
});
