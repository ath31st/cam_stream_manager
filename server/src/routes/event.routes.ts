import { Router } from 'express';
import { eventController } from '../utils/init';
import { API_PREFIX } from '../utils/routes.constants';

const router = Router();

router.get('/events', eventController.getEvents);
router.delete('/events/:id', eventController.deleteEvent);

const eventRoutes = Router();
eventRoutes.use(API_PREFIX, router);

export default eventRoutes;
