export interface IDomainEvent<T> {
  topic: string;
  data: T;
  createdAt: string;
}

export abstract class DomainEvent<T> implements IDomainEvent<T>{
  createdAt: string = new Date(Date.now()).toUTCString();
  constructor(public data: T, public topic: string) { }
}
