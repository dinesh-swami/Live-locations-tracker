import kafkaConnection from "./kafka-client.js";
import LocationLog from "./models/location-log.js";

const historyConsumer = kafkaConnection.consumer({
  groupId:
    process.env.LOCATION_HISTORY_CONSUMER_GROUP || "location-history-processor",
});

let isHistoryConsumerRunning = false;

async function startLocationHistoryConsumer() {
  if (isHistoryConsumerRunning) {
    return historyConsumer;
  }

  await historyConsumer.connect();
  await historyConsumer.subscribe({
    topic: "location-updates",
    fromBeginning: false,
  });

  await historyConsumer.run({
    eachMessage: async ({ message, heartbeat }) => {
      let data;

      //  safe parse warna consumer crash ho jayega
      try {
        data = JSON.parse(message.value.toString());
      } catch (err) {
        console.error("Invalid JSON:", err);
        return;
      }
      // ek simple valition dal diya
      if (!data?.id || data.lat == null || data.lon == null) {
        console.error("Invalid payload:", data);
        return;
      }

      // data nikal lete hai
      const newLocation = {
        latitude: data.lat,
        longitude: data.lon,
        loggedAt: new Date(),
      };

      await LocationLog.updateOne(
        { userId: data.id },
        {
          $push: {
            locations: {
              $each: [newLocation],
              $slice: -1000,
            },
          },
          $set: {
            userName: data.name ?? null,
            lastLocation: newLocation,
          },
        },
        { upsert: true },
      );

      await heartbeat();
    },
  });

  isHistoryConsumerRunning = true;
  console.log("Location history consumer is running");

  return historyConsumer;
}

export default startLocationHistoryConsumer;
