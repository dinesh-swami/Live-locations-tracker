import { Kafka } from "kafkajs";

const kafkaConnection = new Kafka({
    clientId: "location-finder",
    brokers: ["localhost:9092"]
});

export default kafkaConnection;
