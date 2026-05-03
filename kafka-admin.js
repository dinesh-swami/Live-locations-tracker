import kafkaConnection from "./kafka-client.js";


async function createTopics() {
    const admin = kafkaConnection.admin();

    console.log("admin connecting...")
    await admin.connect();

    console.log("admin connect successfully!");

    await admin.createTopics({
        topics: [{ topic: 'location-updates', numPartitions: 2 }]
    });


    await admin.disconnect();
    console.log("admin disconnect successfully!");

};

createTopics();
