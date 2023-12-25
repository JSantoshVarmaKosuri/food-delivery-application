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
  ): T;
  validateAndCreateOrder(order: T): OrderCreatedEvent;
  payCurrentOrder(order: T, paymentId: PaymentID): OrderPaidEvent;
  approveCurrentOrder(order: T): OrderApprovedEvent;
  rejectCurrentOrder(order: T): OrderRejectedEvent;
  cancelCurrentOrder(order: T): OrderCanceledEvent;
  getTracking(order: T): TrackingID | undefined
}
