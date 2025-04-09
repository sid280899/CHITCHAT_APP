import { app, server } from './socket/socket.js';
import express from 'express';
import { connectDB } from './db/connection1.db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

connectDB();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 5000;

// routes
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);

// middlewares
import { errorMiddleware } from './middlewares/error.middleware.js';
app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`your server is running on port ${port}`);
});
