import { Router } from 'express';
import { API_PREFIX } from '../utils/constants/routes.constants';

const router = Router();

router.get('/health-check', (_, res) => {
  res.status(200).json({ status: 'OK' });
});

const healthCheckRoutes = Router();
healthCheckRoutes.use(API_PREFIX, router);

export default healthCheckRoutes;
