// src/workers/sayHello.job.js
module.exports = function (agenda) {
  agenda.define('say hello', async (job) => {
    console.log('👋 Hello from Agenda at', new Date());
  });
};
