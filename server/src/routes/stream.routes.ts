import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth.middleware';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { streamController } from '../utils/init';

const router = Router();

router.post('/streams', isAuthenticated, streamController.createStream);
router.put('/streams/:id', isAuthenticated, streamController.updateStream);
router.delete('/streams/:id', isAuthenticated, streamController.deleteStream);
router.get('/streams', isAuthenticated, streamController.getStreams);
router.get('/streams/:id', isAuthenticated, streamController.getStream);
router.get('/streams/playlist/:id', streamController.getStreamsByPlaylist);

const streamRoutes = Router();
streamRoutes.use(API_PREFIX, router);

export default streamRoutes;
