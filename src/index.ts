import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { userRouter } from './routes/user';
import { campgroundRouter } from './routes/campground';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(campgroundRouter);

mongoose.connect(`${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
