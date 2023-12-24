export abstract class BaseID<T> {
  constructor(private readonly _id: T) { }

  get id() {
    return this._id;
  }
}
