import { BaseID } from "../Common/BaseID";

export class CustomerID<T> extends BaseID<T> {
  constructor(id: T) {
    super(id);
  }
}
