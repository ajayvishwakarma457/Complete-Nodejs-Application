// src/workers/sayHello.job.js
module.exports = function (agenda) {
  agenda.define('say hello', async (job) => {
    console.log('👋 Hello from Agenda at', new Date());
  });

  (async function () {
    await agenda.start();
    await agenda.every("5 seconds", "say hello");
  })();

};
