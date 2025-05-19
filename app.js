const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/config');
const helmet = require('helmet');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema');
const agenda = require('./src/queues/agenda');
const loadJobs = require('./src/queues/jobLoader');

// Load job definitions
loadJobs(agenda);

(async () => {
  await agenda.start();

  // Schedule or trigger jobs
  await agenda.now('say hello');
  // await agenda.every('5 minutes', 'say hello');
})();

const app = express();
connectDB();
// app.use(helmet());

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors(corsOptions));

require('dotenv').config();


// const authRoute = require('./src/routes/moview/authRoute');
// const authMiddleware = require('./src/middlewares/moview/authMiddleware');

// const userRoutes = require('./src/routes/moview/userRoute');

const emailRoute = require('./src/routes/emailRoute');
app.use('/api', emailRoute);

app.use('/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

require('./src/workers/emailWorker');
require('./src/workers/kafkaConsumer');

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));