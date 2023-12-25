import { Consumer, Kafka, Partitioners, Producer } from "kafkajs";

export const kafkaInit = (brokers: string[], client: string, group: string): { producer: Producer, listener: Consumer } => {
  const kafka = new Kafka({
    clientId: client,
    brokers: brokers
  })

  const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
    allowAutoTopicCreation: true
  });
  const listener = kafka.consumer({ groupId: group });

  return { producer: producer, listener: listener };
}
