import { BaseID } from "../Common/BaseID";

export class PaymentID<T> extends BaseID<T> {
  constructor(id: T) {
    super(id);
  }
}
