export abstract class Address {
  constructor(
    private _building: string,
    private _street: string,
    private _locality: string,
    private _city: string,
    private _zipcode: string,
    private _landmark?: string,
    private _instructions?: string
  ) { }

  get building() {
    return this._building;
  }

  get street() {
    return this._street;
  }

  get locality() {
    return this._locality;
  }

  get city() {
    return this._city;
  }

  get zipcode() {
    return this._zipcode;
  }

  get landmark() {
    return this._landmark || undefined;
  }

  get instructions() {
    return this._instructions || undefined;
  }

  toBaseAddress() {
    return `
    ${this._building}, ${this._street}\n
    ${this._locality}\n
    ${this._city} - ${this._zipcode}${(this._landmark || this._landmark) ? "\n" : ""}
    ${(this._landmark) ? this._landmark + "\n" : ""}
    ${(this._instructions) ? this._instructions : ""}
    `
  }
}
