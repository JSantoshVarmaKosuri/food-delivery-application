import { BaseID } from "../Common/BaseID";

export class OrderID<T> extends BaseID<T> {
  constructor(id: T) {
    super(id);
  }
}
