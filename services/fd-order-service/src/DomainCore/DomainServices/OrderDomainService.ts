import { OrderID, CustomerID, RestarentID, CustomerAddress, OrderTopics, PaymentID, TrackingID } from "@food-delivery-application/fd-common-library";
import { Order } from "../Entities/Order";
import { OrderItem } from "../Entities/OrderItem";
import { OrderApprovedEvent } from "../Events/OrderApprovedEvent";
import { OrderCanceledEvent } from "../Events/OrderCanceledEvent";
import { OrderCreatedEvent } from "../Events/OrderCreatedEvent";
import { OrderPaidEvent } from "../Events/OrderPaidEvent";
import { OrderRejectedEvent } from "../Events/OrderRejectedEvent";
import { IOrderDomainService } from "./interfaces/IOrderDomainService";
import { IOrderRepository } from "../../DataAccess/interfaces/IOrderRepository";

export class OrderDomainService implements IOrderDomainService<Order> {
  constructor(private repository: IOrderRepository<Order>) {}

  async initilizeAnOrder(
    orderId: OrderID,
    customerId: CustomerID,
    restarentId: RestarentID,
    customerAddress: CustomerAddress,
    orderItems: OrderItem[]): Promise<Order> {
    return Promise.resolve(new Order(orderId, customerId, restarentId, customerAddress, orderItems));
  }
  async validateAndCreateOrder(order: Order): Promise<OrderCreatedEvent> {
    order.createOrder();
    await this.repository.save(order);
    return Promise.resolve(new OrderCreatedEvent(order, OrderTopics.ORDER_CREATED_EVENT));
  }
  async payCurrentOrder(order: Order, paymentId: PaymentID): Promise<OrderPaidEvent> {
    order.payOrder(paymentId);
    return Promise.resolve(new OrderPaidEvent(order, OrderTopics.ORDER_PAID_EVENT));
  }
  async approveCurrentOrder(order: Order): Promise<OrderApprovedEvent> {
    order.approveOrder();
    return Promise.resolve(new OrderPaidEvent(order, OrderTopics.ORDER_APPROVED_EVENT));
  }
  async rejectCurrentOrder(order: Order): Promise<OrderRejectedEvent> {
    order.rejectOrder();
    return Promise.resolve(new OrderPaidEvent(order, OrderTopics.ORDER_REJECTED_EVENT));
  }
  async cancelCurrentOrder(order: Order): Promise<OrderCanceledEvent> {
    order.cancelOrder();
    return Promise.resolve(new OrderPaidEvent(order, OrderTopics.ORDER_CANCLED_EVENT));
  }

  async getTracking(order: Order): Promise<TrackingID | undefined> {
    return Promise.resolve(order.trackingId);
  }
}
