import { Router } from 'express';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { authController } from '../utils/init';

const router = Router();

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshAccessToken);
router.post('/logout', authController.logout);

const authRoutes = Router();
authRoutes.use(API_PREFIX, router);

export default authRoutes;
