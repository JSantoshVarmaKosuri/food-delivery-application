import { AggregateEntity, Amount, CustomerAddress, CustomerID, OrderID, OrderStatus, PaymentID, RestarentID, TrackingID } from "@food-delivery-application/fd-common-library";
import { OrderItem } from "./OrderItem";
import { v4 as uuidv4 } from "uuid";

export class Order extends AggregateEntity<OrderID> {
  readonly price: Amount;
  constructor(
    orderId: OrderID,
    public readonly customerId: CustomerID,
    public readonly restarentId: RestarentID,
    public readonly address: CustomerAddress,
    public readonly orderItems: OrderItem[],
    public orderStatus?: OrderStatus,
    public paymentId?: PaymentID,
    public trackingId?: TrackingID,
  ) {
    super(orderId);
    this.price = new Amount(Amount.Zero);
    this.orderItems.forEach((orderItem: OrderItem) => {
      this.price.addAmount(orderItem.dish.price.multiplyAmount(orderItem.quantity).bvalue);
    });

    console.info(`Order with OrderID: ${this.id} is initilized with a price of ${this.price.value} for a CustomerID: ${this.customerId.id}`);
  }

  private validatePrice(): void {
    const total = new Amount(Amount.Zero);
    this.orderItems.forEach((orderItem: OrderItem) => {
      total.addAmount(orderItem.subTotal.bvalue);
    });

    if (!total.isEqual(this.price.bvalue)) {
      throw new Error(`Order with OrderID: ${this.id} is rejected with as price of ${this.price.value} does not match ${total.bvalue}`);
    }
  }

  validateOrder(): void {
    this.validatePrice();
  }

  createOrder(): void {
    this.validateOrder()
    this.orderStatus = OrderStatus.PENDING;
    this.trackingId = new TrackingID(uuidv4());
  }

  payOrder(paymentId: PaymentID): void {
    if (this.orderStatus != OrderStatus.PENDING) {
      throw new Error("Order is not in the right state for payment.");
    } else {
      this.orderStatus = OrderStatus.PAID;
      this.paymentId = paymentId;
    }
  }

  approveOrder(): void {
    if (this.orderStatus != OrderStatus.PAID) {
      throw new Error("Order is not in the right state for approval.");
    } else {
      this.orderStatus = OrderStatus.APPROVED;
    }
  }

  cancelOrder(): void {
    if (!(this.orderStatus === OrderStatus.PAID
      || this.orderStatus === OrderStatus.PENDING
      || this.orderStatus === OrderStatus.REJECTED)) {
      throw new Error("Order is not in the right state for cancellation.");
    } else {
      this.orderStatus = OrderStatus.CANCELLED;
    }
  }

  rejectOrder(): void {
    if (this.orderStatus != OrderStatus.PENDING) {
      throw new Error("Order is not in the right state for rejection.");
    } else {
      this.orderStatus = OrderStatus.REJECTED;
    }
  }
}
