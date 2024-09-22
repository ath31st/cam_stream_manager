import { Router } from 'express';
import { streamController } from '../utils/init';

const router = Router();

router.post('/streams', streamController.createStream);
router.put('/streams/:id', streamController.updateStream);
router.delete('/streams/:id', streamController.deleteStream);
router.get('/streams', streamController.getAllStreams);
router.get('/streams/:id', streamController.getStream);
router.get('/streams/region/:id', streamController.getStreamsByRegion);

const streamRoutes = Router();
const apiPrefix = '/api/v1';
streamRoutes.use(apiPrefix, router);

export default streamRoutes;
