import { Consumer } from "kafkajs";

export abstract class DomainListenerEvent<T> {
  private readonly data: T;
  constructor() { }

  abstract listen(consumer: Consumer, topics: string[], fromBeginning: boolean);
}
