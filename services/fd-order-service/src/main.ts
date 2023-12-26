import { OrderTopics, kafkaInit } from '@food-delivery-application/fd-common-library';
import express from 'express';
import { OrderListener } from './MesageQueue/OrderListener';
import { OrderPublisher } from './MesageQueue/OrderPublisher';
import { OrderGateway } from './ApplicationServices/OrderService';
import { OrderDomainService } from './DomainCore/DomainServices/OrderDomainService';
import { OrderRepository } from './DataAccess/OrderRepository';
import mongoose from 'mongoose';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3110;

const connectDB = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conn: any = await mongoose.connect(
      "mongodb://localhost:27017/fd-orders",
      {
        authSource: "admin",
        user: "satoa",
        pass: "qwert",
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

const app = express();

const { producer, listener } = kafkaInit(['localhost:9092'], 'fd-order-service', 'fd-events-group');

const orderListener = new OrderListener();
orderListener.listen(listener, [OrderTopics.ORDER_CREATED_EVENT]);
const orderPublisher = new OrderPublisher(producer);

const orderRepository = new OrderRepository();
const orderService = new OrderDomainService(orderRepository);
const orderGateway = new OrderGateway(orderService, orderPublisher);

app.post("/service/create", orderGateway.Create);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  connectDB();
  console.log(`[ ready ] http://${host}:${port}`);
});
