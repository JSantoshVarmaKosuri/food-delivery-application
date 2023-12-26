import { CustomerAddress, CustomerID, OrderID, PaymentID, RestarentID, TrackingID } from "@food-delivery-application/fd-common-library";
import { OrderApprovedEvent } from "../../Events/OrderApprovedEvent";
import { OrderCanceledEvent } from "../../Events/OrderCanceledEvent";
import { OrderCreatedEvent } from "../../Events/OrderCreatedEvent";
import { OrderPaidEvent } from "../../Events/OrderPaidEvent";
import { OrderRejectedEvent } from "../../Events/OrderRejectedEvent";
import { OrderItem } from "../../Entities/OrderItem";

export interface IOrderDomainService<T> {
  initilizeAnOrder(
    orderId: OrderID,
    customerId: CustomerID,
    restarentId: RestarentID,
    customerAddress: CustomerAddress,
    orderItems: OrderItem[]
  ): Promise<T>;
  validateAndCreateOrder(order: T): Promise<OrderCreatedEvent>;
  payCurrentOrder(order: T, paymentId: PaymentID): Promise<OrderPaidEvent>;
  approveCurrentOrder(order: T): Promise<OrderApprovedEvent>;
  rejectCurrentOrder(order: T): Promise<OrderRejectedEvent>;
  cancelCurrentOrder(order: T): Promise<OrderCanceledEvent>;
  getTracking(order: T): Promise<TrackingID | undefined>
}
