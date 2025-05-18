const express = require('express');
const router = express.Router();
const emailQueue = require('../queues/emailQueue');

router.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;
  await emailQueue.add({ to, subject, body });
  res.json({ message: 'Email job added to queue' });
});

module.exports = router;
