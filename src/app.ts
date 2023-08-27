import * as express from 'express';
import * as dotenv from 'dotenv';
import { readHeadersMiddleware } from './middleware/auth';
import router from './routes/route';
import { redisMiddleware } from "./middleware/redis";
import {transform} from "./middleware/interceptor";
import * as mung from 'express-mung';
dotenv.config();


const app = express();

app.use(express.json());

// Redis Cache Middleware
app.use(redisMiddleware);

// global middlware to log request headers..
app.use(readHeadersMiddleware);

// Interceptor MiddleWare.
app.use(mung.json(transform))

app.use('/api', router);

export default app;
