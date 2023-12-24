import { DomainListenerEvent } from "@food-delivery-application/fd-common-library";
import { Order } from "../DomainCore/Entities/Order";
import { Consumer } from "kafkajs";

export class OrderListener extends DomainListenerEvent<Order>{
  async listen(consumer: Consumer, topics: string[], fromBeginning: boolean = true) {
    await consumer.connect()

    topics.forEach(async (topic: string) => {
      await consumer.subscribe({ topic: topic, fromBeginning: fromBeginning });
    });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const transmittedData = JSON.parse(message.value.toString());
        if (transmittedData) console.info(`${topic} was recived from the queue.`);
      },
    })
  }
}
