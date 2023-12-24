import { BaseID } from "../Common/BaseID";

export class DishID extends BaseID<string> {
  constructor(id: string) {
    super(id);
  }
}
