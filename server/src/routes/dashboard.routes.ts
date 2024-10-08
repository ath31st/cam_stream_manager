import { Router } from 'express';
import { dashboardController } from '../utils/init';
import { API_PREFIX } from '../utils/constants/routes.constants';

const router = Router();

router.get('/dashboard', dashboardController.getDashboardData);

const dashboardRoutes = Router();
dashboardRoutes.use(API_PREFIX, router);

export default dashboardRoutes;
