const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/config');
const helmet = require('helmet');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema');

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
require('./src/workers/emailWorker');

// const authRoute = require('./src/routes/moview/authRoute');
// const authMiddleware = require('./src/middlewares/moview/authMiddleware');

// const userRoutes = require('./src/routes/moview/userRoute');
// const movieRoute = require('./src/routes/moview/movieRoute');
// const showRoute = require('./src/routes/moview/showRoute');
// const notificationRoute = require('./src/routes/moview/notificationRoute');
// const showNotificationRoute = require('./src/routes/moview/showNotificationRoute');
// const reviewRoute = require('./src/routes/moview/reviewRoute');
// const reviewShowRoute = require('./src/routes/moview/reviewShowRoute');
// const followingFollowerRoute = require('./src/routes/moview/followingFollowerRoute');
// const latestMovieShowRoute = require('./src/routes/moview/latestMovieShowRoute');
// const supportContactRoute = require('./src/routes/moview/supportContactRoute');
// const movieReportReviewRoute = require('./src/routes/moview/movieReportReviewRoute');
// const showReportReviewRoute = require('./src/routes/moview/showReportReviewRoute');
// const userMovieViewRoute = require('./src/routes/moview/userMovieViewRoute');
// const userShowViewRoute = require('./src/routes/moview/userShowViewRoute');
// const topSearchedMoviesRoute = require('./src/routes/moview/topSearchedMoviesRoute');
// const topSearchedShowsRoute = require('./src/routes/moview/topSearchedShowsRoute');

// const followNotificationRoute = require('./src/routes/moview/followNotificationRoute');
// const bannerRoute = require('./src/routes/moview/bannerRoute');

// const testRoute = require('./src/routes/moview/testRoute');
// app.use('/api', testRoute);

// app.use('/api', authRoute);
// app.use('/api', userRoutes);
// app.use('/api', supportContactRoute);

// app.use('/api', authMiddleware.verifyToken, movieRoute);
// app.use('/api', authMiddleware.verifyToken, showRoute);
// app.use('/api', authMiddleware.verifyToken, notificationRoute);
// app.use('/api', authMiddleware.verifyToken, showNotificationRoute);

// app.use('/api', authMiddleware.verifyToken, reviewRoute);
// app.use('/api', authMiddleware.verifyToken, reviewShowRoute);
// app.use('/api', authMiddleware.verifyToken, followingFollowerRoute);
// app.use('/api', authMiddleware.verifyToken, latestMovieShowRoute);
// app.use('/api', authMiddleware.verifyToken, movieReportReviewRoute);
// app.use('/api', authMiddleware.verifyToken, showReportReviewRoute);

// app.use('/api', authMiddleware.verifyToken, userMovieViewRoute);
// app.use('/api', authMiddleware.verifyToken, userShowViewRoute);
// app.use('/api', authMiddleware.verifyToken, topSearchedMoviesRoute);
// app.use('/api', authMiddleware.verifyToken, topSearchedShowsRoute);

// app.use('/api/follow/', authMiddleware.verifyToken, followNotificationRoute);
// app.use('/api', authMiddleware.verifyToken, bannerRoute);

const emailRoute = require('./src/routes/emailRoute');
app.use('/api', emailRoute);

app.use('/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));