import { Server } from "socket.io"
import kafkaConnection from "./kafka-client.js";

const producer = kafkaConnection.producer();
const consumer = kafkaConnection.consumer({
  groupId: `socket-server-${process.env.PORT ?? 8000}`
});

async function initializeSocket(server) {
    const io = new Server(server);

    await producer.connect();
    await consumer.connect();

    consumer.subscribe({topic: "location-updates", fromBeginning: true});

    consumer.run({
        eachMessage: async ({topic, partition, message, heartbeat}) => {
            const data = JSON.parse(message.value.toString());
            console.log(data);
            io.emit("server:response:location:updates", data);
            await heartbeat();
        },
    });

    io.on("connection", (socket) => {
        console.log(socket.id);

        socket.on("client:location:updates", (loactionData) => {
            const location = loactionData.locationLatLon;
            const userId = loactionData.userId;
            const name = loactionData.userName;
            producer.send({topic: "location-updates", messages: [{
                key: userId,
                value: JSON.stringify({id: userId, name, ...location})
            }]})
        })
    })
};

export default initializeSocket;
