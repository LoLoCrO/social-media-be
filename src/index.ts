import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import sequelize from './config/sequelize';
import router from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

const options = {
  origin: `http://localhost:${port}`,
  credentials: true,
};

app.use(cors(options));
app.use(router);

sequelize.sync()
  .then(() => {
    console.log("Synced db.");
    app.listen(port, () => console.log('Server is running'));
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });