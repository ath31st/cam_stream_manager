import { Router } from 'express';
import { dashboardController } from '../utils/init';

const router = Router();

router.get('/dashboard', dashboardController.getDashboardData);

const dashboardRoutes = Router();
const apiPrefix = '/api/v1';
dashboardRoutes.use(apiPrefix, router);

export default dashboardRoutes;
