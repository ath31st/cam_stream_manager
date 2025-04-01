import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth.middleware';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { dashboardController } from '../utils/init';

const router = Router();

router.get('/dashboard', isAuthenticated, dashboardController.getDashboardData);

const dashboardRoutes = Router();
dashboardRoutes.use(API_PREFIX, router);

export default dashboardRoutes;
