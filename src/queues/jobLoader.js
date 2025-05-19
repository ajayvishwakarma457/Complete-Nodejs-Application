// src/queues/jobLoader.js
const sayHelloJob = require('../workers/sayHello.job');

module.exports = function (agenda) {
  sayHelloJob(agenda);
  // Add more jobs here as needed
};
