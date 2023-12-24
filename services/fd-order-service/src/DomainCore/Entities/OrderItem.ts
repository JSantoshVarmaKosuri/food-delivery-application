import { Amount, BaseEntity, OrderID } from "@food-delivery-application/fd-common-library";
import { OrderItemID } from "../ValueTypes/OrderItemID";
import { Dish } from "./Dish";

export class OrderItem extends BaseEntity<OrderItemID>{
  public readonly subTotal: Amount;
  constructor(
    public readonly orderItemId: OrderItemID,
    public readonly orderId: OrderID,
    public readonly dish: Dish,
    public readonly quantity: number
  ) {
    super(orderItemId);
    this.subTotal = new Amount(this.dish.price.multiplyAmount(this.quantity).bvalue);
  }
}
