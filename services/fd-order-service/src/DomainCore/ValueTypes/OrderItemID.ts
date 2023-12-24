import { BaseID } from "@food-delivery-application/fd-common-library";

export class OrderItemID extends BaseID<string> {
  constructor(id: string) {
    super(id);
  }
}
