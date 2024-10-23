import { Router } from 'express';
import { regionController } from '../utils/init';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

router.post('/regions', isAuthenticated, regionController.createRegion);
router.put('/regions/:id', isAuthenticated, regionController.updateRegion);
router.delete('/regions/:id', isAuthenticated, regionController.deleteRegion);
router.get('/regions', regionController.getRegions);
router.get('/regions/:id', isAuthenticated, regionController.getRegion);

const regionRoutes = Router();
regionRoutes.use(API_PREFIX, router);

export default regionRoutes;
