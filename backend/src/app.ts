// **DEPENDENCIES**

// --top-level-- //
import dotenv from 'dotenv';
import express from 'express';

// --security--
import cors from 'cors';
import helmet from 'helmet';

// --requestHandlers--
// import bodyParser from 'body-parser'; // You can remove this import if you switch to express.json()
import cookieParser from 'cookie-parser';

// --logger--
import morgan from 'morgan';

// --imports--
import loggerApp from './utils/logger';
import connectDB from './config/db';
import { IUser } from './types/authTypes';
import courRouter from './routes/courRoutes';
import studentRouter from './routes/studentRoutes';
import inscriptionRouter from './routes/inscriptionRoutes';
import sessionRouter from './routes/sessionRoutes';
import paimentRouter from './routes/paimentRoutes';
import attendanceRouter from './routes/attendanceRoutes';
import salleRouter from './routes/salleRoutes';
import gradeRouter from './routes/gradeRoutes';
import subjectRouter from './routes/subjectRoutes';

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
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(helmet());

// **Crucial: Place body parsing middleware here, BEFORE your routes**
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // cookieParser can be after body parsing

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
// ex: app.use('/auth', authRouter);

app.use('/api/v1/cours', courRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/inscriptions', inscriptionRouter);
app.use('/api/v1/sessions', sessionRouter);
app.use('/api/v1/paiments', paimentRouter);
app.use('/api/v1/attendance', attendanceRouter);
app.use('/api/v1/salle', salleRouter);
app.use('/api/v1/grades', gradeRouter);
app.use('/api/v1/subjects', subjectRouter);

// *********
// EXECUTION
app.listen(PORT, () => {
  console.log(`Server running at port: http://localhost:${PORT} 🍵`);
});