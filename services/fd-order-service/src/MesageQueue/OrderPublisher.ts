import { DomainEvent, DomainPublisherEvent } from "@food-delivery-application/fd-common-library";
import { OrderApprovedEvent } from "../DomainCore/Events/OrderApprovedEvent";
import { Order } from "../DomainCore/Entities/Order";
import { Producer } from "kafkajs";

export class OrderPublisher extends DomainPublisherEvent<Order, DomainEvent<Order>> {

  constructor(producer: Producer) {
    super(producer);
  }

  async publish(event: OrderApprovedEvent) {
    await this.producer.connect()
    await this.producer.send({
      topic: event.topic,
      messages: [
        { value: JSON.stringify(event.data) },
      ],
    })

    await this.producer.disconnect()
  }
}

