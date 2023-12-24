export abstract class BaseEntity<T> {
  constructor(private readonly _id: T) { }

  get id() {
    return this._id;
  }
}
