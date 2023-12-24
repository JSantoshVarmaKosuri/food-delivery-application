import { BaseID } from "../Common/BaseID";

export class RestarentID<T> extends BaseID<T> {
  constructor(id: T) {
    super(id);
  }
}
