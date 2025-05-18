const kafka = require('../config/kafka');
const consumer = kafka.consumer({ groupId: 'user-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
};

runConsumer();

module.exports = consumer;
