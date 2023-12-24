import { Amount, CustomerAddress, CustomerID, DishID, OrderID, OrderTopics, RestarentID, kafkaInit } from '@food-delivery-application/fd-common-library';
import express, { NextFunction, Request, Response } from 'express';
import { OrderListener } from './MesageQueue/OrderListener';
import { OrderPublisher } from './MesageQueue/OrderPublisher';
import { OrderCreatedEvent } from './DomainCore/Events/OrderCreatedEvent';
import { Order } from './DomainCore/Entities/Order';
import { OrderItem } from './DomainCore/Entities/OrderItem';
import { OrderItemID } from './DomainCore/ValueTypes/OrderItemID';
import { Dish } from './DomainCore/Entities/Dish';
import { v4 as uuidv4 } from "uuid";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3110;

const app = express();

const { producer, listener } = kafkaInit(['localhost:9092']);

const orderListener = new OrderListener();
orderListener.listen(listener, [OrderTopics.ORDER_CREATED_EVENT]);
const orderPublisher = new OrderPublisher(producer);

app.use((req: Request, res: Response, next: NextFunction) => {
  req["producer"] = orderPublisher
  next();
});

app.get('/', (req, res) => {
  const orderId = new OrderID(uuidv4());
  const customerId = new CustomerID(uuidv4());
  const restarentId = new RestarentID(uuidv4());

  const sampleAddress = new CustomerAddress("building", "street", "locality", "city", "500084");

  interface Generator { price: number, quantity: number };
  const sampleGenrators: Generator[] = [{ price: 2.45, quantity: Math.ceil(Math.random() * 10) }, { price: 2.45, quantity: Math.ceil(Math.random() * 10) }, { price: 2.45, quantity: Math.ceil(Math.random() * 10) }];
  const sampleOrderItems: OrderItem[] = sampleGenrators.map((data: Generator, index: number) => {
    return new OrderItem(new OrderItemID(uuidv4()), orderId, new Dish(new DishID(uuidv4()), "dish_" + index, new Amount(data.price)), data.quantity);
  });
  const order: Order = new Order(orderId, customerId, restarentId, sampleAddress, sampleOrderItems);

  req["producer"].publish(new OrderCreatedEvent(order, OrderTopics.ORDER_CREATED_EVENT));

  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
