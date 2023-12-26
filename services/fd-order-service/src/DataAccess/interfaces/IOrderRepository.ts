export interface IOrderRepository<T> {
  save(order: T): Promise<T>
  update(order: T): Promise<T>
  get(orderId: string): Promise<T>
  delete(orderId: string): Promise<T>
  all(): Promise<T[]>
}
