export abstract class DomainListenerEvent<T> {
  private readonly data: T;
  constructor() { }

  abstract listen();
}
