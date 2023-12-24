export abstract class Address {
  constructor(
    private building: string,
    private street: string,
    private locality: string,
    private city: string,
    private zipcode: string,
    private landmark?: string,
    private instructions?: string
  ) { }

  toBaseAddress() {
    return `
    ${this.building}, ${this.street}\n
    ${this.locality}\n
    ${this.city} - ${this.zipcode}${(this.landmark || this.landmark) ? "\n" : ""}
    ${(this.landmark) ? this.landmark + "\n" : ""}
    ${(this.instructions) ? this.instructions : ""}
    `
  }
}
