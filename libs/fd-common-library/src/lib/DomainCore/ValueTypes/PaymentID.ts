import { BaseID } from "../Common/BaseID";

export class PaymentID extends BaseID<string> {
  constructor(id: string) {
    super(id);
  }
}
