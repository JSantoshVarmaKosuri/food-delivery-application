import { BaseID } from "../Common/BaseID";

export class CustomerID extends BaseID<string> {
  constructor(id: string) {
    super(id);
  }
}
