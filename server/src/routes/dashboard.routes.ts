import { Router } from 'express';
import { dashboardController } from '../utils/init';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

router.get('/dashboard', isAuthenticated, dashboardController.getDashboardData);

const dashboardRoutes = Router();
dashboardRoutes.use(API_PREFIX, router);

export default dashboardRoutes;
