import mongoose from "mongoose";
import { Order } from "../DomainCore/Entities/Order";
import { OrderModel } from "./Models/OrderModel";
import { IOrderRepository } from "./interfaces/IOrderRepository";

import { domainOrderToOrderModel } from "./Mappers/domainOrderToOrder";

export class OrderRepository implements IOrderRepository<Order> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private db: mongoose.Model<any>
  constructor() {
    this.db = OrderModel;
  }

  async save(order: Order): Promise<Order> {
    try {
      await this.db.create(domainOrderToOrderModel(order));

      return Promise.resolve(order);
    } catch (e) {
      throw new Error("Save Failed: " + e);
    }

  }
  async update(order: Order): Promise<Order> {
    console.log("update :", order);
    throw new Error("Method not implemented.");
  }
  async get(orderId: string): Promise<Order> {
    console.log("get :", orderId);
    throw new Error("Method not implemented.");
  }
  async delete(orderId: string): Promise<Order> {
    console.log("delete :", orderId);
    throw new Error("Method not implemented.");
  }
  async all(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
