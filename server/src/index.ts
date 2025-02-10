import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import streamRoutes from './routes/stream.routes';
import { Logger } from './utils/logger';
import { startStreamCronJob } from './cron/stream.cron';
import regionRoutes from './routes/region.routes';
import rpRoutes from './routes/responsible.person.routes';
import dashboardRoutes from './routes/dashboard.routes';
import userRoutes from './routes/user.routes';
import eventRoutes from './routes/event.routes';
import healthCheckRoutes from './routes/health.check.routes';
import authRoutes from './routes/auth.routes';
import passport from 'passport';
import { configurePassport } from './config/passport';
import groupRoutes from './routes/group.routes';

dotenv.config();

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
configurePassport(passport);

app.use(eventRoutes);
app.use(regionRoutes);
app.use(rpRoutes);
app.use(streamRoutes);
app.use(groupRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(dashboardRoutes);
app.use(healthCheckRoutes);

startStreamCronJob();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  Logger.log(`[server]: Server is running at http://localhost:${port}`);
});
