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

// *********
// ROUTES

// *********
// EXECUTION
app.listen(PORT, () => {
  console.log(`Server running at port: http://localhost:${PORT} 🍵`);
});
