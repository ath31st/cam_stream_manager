import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth.middleware';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { eventController } from '../utils/init';

const router = Router();

router.get('/events', isAuthenticated, eventController.getEvents);
router.delete('/events/:id', isAuthenticated, eventController.deleteEvent);

const eventRoutes = Router();
eventRoutes.use(API_PREFIX, router);

export default eventRoutes;
