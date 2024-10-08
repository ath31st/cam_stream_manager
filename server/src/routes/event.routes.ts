import { Router } from 'express';
import { eventController } from '../utils/init';

const router = Router();

router.get('/events', eventController.getEvents);
router.delete('/events/:id', eventController.deleteEvent);

const eventRoutes = Router();
const apiPrefix = '/api/v1';
eventRoutes.use(apiPrefix, router);

export default eventRoutes;
