import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { type RequestHandler, type Express } from 'express';
import helmet from 'helmet';
import passport from 'passport';
import { configurePassport } from './config/passport';
import { startStreamCronJob } from './cron/stream.cron';
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import eventRoutes from './routes/event.routes';
import groupRoutes from './routes/group.routes';
import healthCheckRoutes from './routes/health.check.routes';
import playlistRoutes from './routes/playlist.routes';
import rpRoutes from './routes/responsible.person.routes';
import streamRoutes from './routes/stream.routes';
import userRoutes from './routes/user.routes';
import Logger from './utils/logger';

dotenv.config();

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configurePassport(passport);
app.use(passport.initialize() as unknown as RequestHandler);

app.use(eventRoutes);
app.use(playlistRoutes);
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
