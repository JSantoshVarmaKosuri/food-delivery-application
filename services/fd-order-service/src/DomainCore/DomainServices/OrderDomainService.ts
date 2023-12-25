import { OrderID, CustomerID, RestarentID, CustomerAddress, OrderTopics, PaymentID, TrackingID } from "@food-delivery-application/fd-common-library";
import { Order } from "../Entities/Order";
import { OrderItem } from "../Entities/OrderItem";
import { OrderApprovedEvent } from "../Events/OrderApprovedEvent";
import { OrderCanceledEvent } from "../Events/OrderCanceledEvent";
import { OrderCreatedEvent } from "../Events/OrderCreatedEvent";
import { OrderPaidEvent } from "../Events/OrderPaidEvent";
import { OrderRejectedEvent } from "../Events/OrderRejectedEvent";
import { IOrderDomainService } from "./interfaces/IOrderDomainService";

export class OrderDomainService implements IOrderDomainService<Order> {
  constructor() {
  }
  initilizeAnOrder(
    orderId: OrderID,
    customerId: CustomerID,
    restarentId: RestarentID,
    customerAddress: CustomerAddress,
    orderItems: OrderItem[]): Order {
    return new Order(orderId, customerId, restarentId, customerAddress, orderItems);
  }
  validateAndCreateOrder(order: Order): OrderCreatedEvent {
    order.createOrder();
    return new OrderCreatedEvent(order, OrderTopics.ORDER_CREATED_EVENT);
  }
  payCurrentOrder(order: Order, paymentId: PaymentID): OrderPaidEvent {
    order.payOrder(paymentId);
    return new OrderPaidEvent(order, OrderTopics.ORDER_PAID_EVENT);
  }
  approveCurrentOrder(order: Order): OrderApprovedEvent {
    order.approveOrder();
    return new OrderPaidEvent(order, OrderTopics.ORDER_APPROVED_EVENT);
  }
  rejectCurrentOrder(order: Order): OrderRejectedEvent {
    order.rejectOrder();
    return new OrderPaidEvent(order, OrderTopics.ORDER_REJECTED_EVENT);
  }
  cancelCurrentOrder(order: Order): OrderCanceledEvent {
    order.cancelOrder();
    return new OrderPaidEvent(order, OrderTopics.ORDER_CANCLED_EVENT);
  }

  getTracking(order: Order): TrackingID | undefined {
    return order.trackingId;
  }
}
