import { BaseID } from "../Common/BaseID";

export class OrderID extends BaseID<string> {
  constructor(id: string) {
    super(id);
  }
}
