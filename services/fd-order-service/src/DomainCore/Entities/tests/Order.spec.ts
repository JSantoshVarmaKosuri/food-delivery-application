import { Amount, CustomerAddress, CustomerID, DishID, OrderID, OrderStatus, PaymentID, RestarentID } from "@food-delivery-application/fd-common-library";
import { Order } from "../Order";
import { v4 as uuidv4 } from "uuid";
import { OrderItem } from "../OrderItem";
import { OrderItemID } from "../../ValueTypes/OrderItemID";
import { Dish } from "../Dish";

describe('Order Entity - Test Suite', () => {
  const orderId = new OrderID(uuidv4());
  const customerId = new CustomerID(uuidv4());
  const restarentId = new RestarentID(uuidv4());
  const paymentId = new PaymentID(uuidv4());

  const sampleAddress = new CustomerAddress("building", "street", "locality", "city", "500084");

  interface Generator { price: number, quantity: number };
  const sampleGenrators: Generator[] = [{ price: 2.45, quantity: Math.ceil(Math.random() * 10) }, { price: 2.45, quantity: Math.ceil(Math.random() * 10) }, { price: 2.45, quantity: Math.ceil(Math.random() * 10) }];
  const sampleOrderItems: OrderItem[] = sampleGenrators.map((data: Generator, index: number) => {
    return new OrderItem(new OrderItemID(uuidv4()), orderId, new Dish(new DishID(uuidv4()), "dish_" + index, new Amount(data.price)), data.quantity);
  });

  it('should create a instance of Order', () => {
    const actual: Order = new Order(orderId, customerId, restarentId, sampleAddress, sampleOrderItems);

    expect(actual).toBeInstanceOf(Order);
  });

  it('should create a instance of Order with nesseary types and values', () => {
    const actual: Order = new Order(orderId, customerId, restarentId, sampleAddress, sampleOrderItems);

    expect(actual.id).toBeInstanceOf(OrderID);
    expect(actual.customerId).toBeInstanceOf(CustomerID);
    expect(actual.restarentId).toBeInstanceOf(RestarentID);
    expect(actual.price).toBeInstanceOf(Amount);
    expect(actual.address).toBeInstanceOf(CustomerAddress);

    expect(actual.orderItems).toBeDefined();
    expect(actual.price).toBeDefined();
    expect(actual.trackingId).toBeUndefined();
    expect(actual.paymentId).toBeUndefined();
    expect(actual.orderStatus).toBeUndefined();
  });

  it('should test the initilization of parameters', () => {
    const actual: Order = new Order(orderId, customerId, restarentId, sampleAddress, sampleOrderItems);

    actual.validateOrder();
    actual.createOrder();

    expect(actual.trackingId).toBeDefined();
    expect(actual.orderStatus).toBeDefined();
    expect(actual.orderStatus).toBe(OrderStatus.PENDING);
  });

  it('should test the payment of order', () => {
    const actual: Order = new Order(orderId, customerId, restarentId, sampleAddress, sampleOrderItems);

    actual.validateOrder();
    actual.createOrder();

    actual.payOrder(paymentId);

    expect(actual.paymentId).toBeDefined();
    expect(actual.orderStatus).toBeDefined();
    expect(actual.orderStatus).toBe(OrderStatus.PAID);
  });

  it('should test the approval of order', () => {
    const actual: Order = new Order(orderId, customerId, restarentId, sampleAddress, sampleOrderItems);

    actual.validateOrder();
    actual.createOrder();
    actual.payOrder(paymentId);

    actual.approveOrder();

    expect(actual.trackingId).toBeDefined();
    expect(actual.paymentId).toBeDefined();
    expect(actual.orderStatus).toBeDefined();
    expect(actual.orderStatus).toBe(OrderStatus.APPROVED);
  });

  it('should test the rejection of order', () => {
    const actual: Order = new Order(orderId, customerId, restarentId, sampleAddress, sampleOrderItems);

    actual.validateOrder();
    actual.createOrder();

    actual.rejectOrder();

    expect(actual.trackingId).toBeDefined();
    expect(actual.paymentId).toBeUndefined();
    expect(actual.orderStatus).toBeDefined();
    expect(actual.orderStatus).toBe(OrderStatus.REJECTED);
  });
});
