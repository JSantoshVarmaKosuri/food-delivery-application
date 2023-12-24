import { DomainEvent } from "../DomainCore/Events/DomainEvent";

export abstract class DomainPublisherEvent<T,F extends DomainEvent<T>> {
  constructor() { }

  abstract publish(event: F);
}
