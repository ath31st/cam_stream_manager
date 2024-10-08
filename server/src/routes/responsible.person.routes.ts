import { Router } from 'express';
import { rpController } from '../utils/init';
import { API_PREFIX } from '../utils/constants/routes.constants';

const router = Router();

router.post('/responsible-persons', rpController.createResponsiblePerson);
router.put('/responsible-persons/:id', rpController.updateResponsiblePerson);
router.delete('/responsible-persons/:id', rpController.deleteResponsiblePerson);
router.get('/responsible-persons/:id', rpController.getResponsiblePerson);
router.get('/responsible-persons', rpController.getAllResponsiblePersons);
router.get(
  '/responsible-persons/stream/:id',
  rpController.getResponsiblePersonsByStream,
);

const rpRoutes = Router();
rpRoutes.use(API_PREFIX, router);

export default rpRoutes;
