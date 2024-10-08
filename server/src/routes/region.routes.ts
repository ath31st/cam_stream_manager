import { Router } from 'express';
import { regionController } from '../utils/init';
import { API_PREFIX } from '../utils/routes.constants';

const router = Router();

router.post('/regions', regionController.createRegion);
router.put('/regions/:id', regionController.updateRegion);
router.delete('/regions/:id', regionController.deleteRegion);
router.get('/regions', regionController.getAllRegions);
router.get('/regions/:id', regionController.getRegion);

const regionRoutes = Router();
regionRoutes.use(API_PREFIX, router);

export default regionRoutes;
