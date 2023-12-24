import { DomainListenerEvent } from "@food-delivery-application/fd-common-library";
import { Order } from "../DomainCore/Entities/Order";

export class OrderListener extends DomainListenerEvent<Order>{
  listen() {

  }
}
