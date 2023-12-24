import { DomainEvent, DomainPublisherEvent } from "@food-delivery-application/fd-common-library";
import { OrderApprovedEvent } from "../DomainCore/Events/OrderApprovedEvent";
import { Order } from "../DomainCore/Entities/Order";

export class OrderListener extends DomainPublisherEvent<Order, DomainEvent<Order>> {

  publish(event: OrderApprovedEvent) {
    console.log(event);
  }
}
