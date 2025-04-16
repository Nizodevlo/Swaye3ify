// **DEPENDENCIES**

// --top-level-- //
import dotenv from 'dotenv';
import express from 'express';

// --security--
import cors from 'cors';
import helmet from 'helmet';

// --requestHandlers--
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// --logger--
import morgan from 'morgan';

// --imports--
import loggerApp from './utils/logger';
import connectDB from './config/db';
import { IUser } from './types/authTypes';
import authRouter from './routes/authRoutes';
import authenticate from './middlewares/authenticate';
import paymentRouter from './routes/paymentRoutes';

// *********
// **VARIABLES**
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;
const morganFormat = ':method :url :status :response-time ms';

// *********
// **MIDDLEWARES**

// --security--
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(helmet());

// --req-middleware--
app.use(bodyParser.json({ limit: '16kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// --logger--
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logParts = message.split(' ');
        const logObject = {
          method: logParts[0],
          url: logParts[1],
          status: logParts[2],
          responseTime: logParts[3],
        };
        loggerApp.info(JSON.stringify(logObject));
      },
    },
  })
);

// *********
// CONNECTION
connectDB();

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// *********
// ROUTES
app.use('/auth', authRouter);
app.use('/payments', authenticate, paymentRouter);

// *********
// EXECUTION
app.listen(PORT, () => {
  console.log(`Server running at port: http://localhost:${PORT} 🍵`);
});
