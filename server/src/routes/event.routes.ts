import { Router } from 'express';
import { eventController } from '../utils/init';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { isAuthenticated } from '../../middleware/auth.middleware';

const router = Router();

router.get('/events', isAuthenticated, eventController.getEvents);
router.delete('/events/:id', isAuthenticated, eventController.deleteEvent);

const eventRoutes = Router();
eventRoutes.use(API_PREFIX, router);

export default eventRoutes;
