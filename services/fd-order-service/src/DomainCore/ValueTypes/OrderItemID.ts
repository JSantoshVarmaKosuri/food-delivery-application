import { BaseID } from "@food-delivery-application/fd-common-library";

export class OrderItemID extends BaseID<string> {
  constructor(public readonly id: string) {
    super(id);
  }
}
