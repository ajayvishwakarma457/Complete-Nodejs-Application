const kafka = require('../config/kafka');
const producer = kafka.producer();

const produceMessage = async (topic, message) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [
      { value: JSON.stringify(message) },
    ],
  });
  await producer.disconnect();
};

module.exports = produceMessage;
