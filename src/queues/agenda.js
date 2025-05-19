// src/queues/agenda.js
const { Agenda } = require('agenda');

const agenda = new Agenda({
  db: { address: process.env.MONGODB_URI || 'mongodb://localhost:27017/agenda-db' },
});

module.exports = agenda;
