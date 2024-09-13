import { Router } from 'express';
import { regionController } from '../utils/init';

const router = Router();

router.post('/regions', regionController.createRegion);
router.put('/regions/:id', regionController.updateRegion);
router.delete('/regions/:id', regionController.deleteRegion);
router.get('/regions', regionController.getAllRegions);
router.get('/regions/:id', regionController.getRegion);

const regionRoutes = Router();
const apiPrefix = '/api/v1';
regionRoutes.use(apiPrefix, router);

export default regionRoutes;
