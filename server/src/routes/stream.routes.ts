import { Router } from 'express';
import { streamController } from '../utils/init';
import { API_PREFIX } from '../utils/routes.constants';

const router = Router();

router.post('/streams', streamController.createStream);
router.put('/streams/:id', streamController.updateStream);
router.delete('/streams/:id', streamController.deleteStream);
router.get('/streams', streamController.getAllStreams);
router.get('/streams/:id', streamController.getStream);
router.get('/streams/region/:id', streamController.getStreamsByRegion);

const streamRoutes = Router();
streamRoutes.use(API_PREFIX, router);

export default streamRoutes;
