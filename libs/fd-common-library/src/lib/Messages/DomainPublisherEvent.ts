import { Producer } from "kafkajs";
import { DomainEvent } from "../DomainCore/Events/DomainEvent";

export abstract class DomainPublisherEvent<T,F extends DomainEvent<T>> {
  constructor(protected producer: Producer) { }

  abstract publish(event: F);
}
