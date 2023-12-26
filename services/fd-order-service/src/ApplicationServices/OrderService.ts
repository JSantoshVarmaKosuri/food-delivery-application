import { Amount, CustomerAddress, CustomerID, DishID, OrderID, RestarentID } from "@food-delivery-application/fd-common-library";
import { Request, Response } from "express";
import { OrderItem } from "../DomainCore/Entities/OrderItem";
import { OrderItemID } from "../DomainCore/ValueTypes/OrderItemID";
import { Dish } from "../DomainCore/Entities/Dish";
import { Order } from "../DomainCore/Entities/Order";
import { v4 as uuidv4 } from "uuid";
import { IOrderDomainService } from "../DomainCore/DomainServices/interfaces/IOrderDomainService";
import { OrderPublisher } from "../MesageQueue/OrderPublisher";

export class OrderGateway {
  constructor(private readonly orderDomainService: IOrderDomainService<Order>, private readonly producer: OrderPublisher) {
    //console.log(this.orderDomainService, this.producer);
  }

  Create = async (req: Request, res: Response) => {
    try {
      const orderId = new OrderID(uuidv4());
      const customerId = new CustomerID(uuidv4());
      const restarentId = new RestarentID(uuidv4());

      const sampleAddress = new CustomerAddress("building", "street", "locality", "city", "500084");

      interface Generator { price: number, quantity: number };
      const sampleGenrators: Generator[] = [{ price: 2.45, quantity: Math.ceil(Math.random() * 10) }, { price: 5.78, quantity: Math.ceil(Math.random() * 10) }, { price: 7.45, quantity: Math.ceil(Math.random() * 10) }];
      const sampleOrderItems: OrderItem[] = sampleGenrators.map((data: Generator, index: number) => {
        return new OrderItem(new OrderItemID(uuidv4()), orderId, new Dish(new DishID(uuidv4()), "dish_" + index, new Amount(data.price)), data.quantity);
      });

      const order: Order = await this.orderDomainService.initilizeAnOrder(orderId, customerId, restarentId, sampleAddress, sampleOrderItems);
      const orderCreatedEvent = await this.orderDomainService.validateAndCreateOrder(order);

      this.producer.publish(orderCreatedEvent);

      res.status(201).json(orderCreatedEvent.data)
    }
    catch (e) {
      res.status(500).json({ error: e.toString() })
    }
  };
}
