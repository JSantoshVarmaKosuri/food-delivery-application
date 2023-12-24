import { DomainEvent, OrderTopics } from "@food-delivery-application/fd-common-library";
import { Order } from "../Entities/Order";

export class OrderApprovedEvent extends DomainEvent<Order> {
  constructor(data: Order, topic: OrderTopics) {
    super(data, topic);
  }
}
