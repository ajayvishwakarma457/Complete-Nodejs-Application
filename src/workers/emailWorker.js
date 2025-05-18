const emailQueue = require('../queues/emailQueue');

emailQueue.process(async (job) => {
  const { to, subject, body } = job.data;

  console.log(`Sending email to ${to}`);
  // Simulate sending email
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Email sent: ${subject}`);
});
