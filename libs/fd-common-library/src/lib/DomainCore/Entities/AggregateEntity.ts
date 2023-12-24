import { BaseEntity } from "./BaseEntity";

export abstract class AggregateEntity<T> extends BaseEntity<T> {
  constructor(id: T) {
    super(id);
  }
}
