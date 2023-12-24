export abstract class BaseEntity<T> {
  constructor(private _id: T) { }

  get id() {
    return this.id;
  }

  set id(id: T) {
    this._id = id;
  }
}
