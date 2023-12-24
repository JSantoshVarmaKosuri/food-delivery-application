import { BaseID } from "../Common/BaseID";

export class DishID<T> extends BaseID<T> {
  constructor(id: T) {
    super(id);
  }
}
