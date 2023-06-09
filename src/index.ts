import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import 'reflect-metadata';

import router from './routes';
import AppDataSource from './config/database';

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
app.use((req, res, next) => {console.log(req.body);});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
    app.listen(port, () => console.log('Server is running'));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })