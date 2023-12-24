import { Consumer, Kafka, Partitioners, Producer } from "kafkajs";

export const kafkaInit = (brokers: string[]): { producer: Producer, listener: Consumer } => {
  const kafka = new Kafka({
    clientId: 'fd-server',
    brokers: brokers
  })

  const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
    allowAutoTopicCreation: true
  });
  const listener = kafka.consumer({ groupId: 'fd-events-group' });

  return { producer: producer, listener: listener };
}
