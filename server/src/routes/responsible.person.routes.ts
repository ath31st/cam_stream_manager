import { Router } from 'express';
import { rpController } from '../utils/init';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { isAuthenticated } from '../../middleware/auth.middleware';

const router = Router();

router.post(
  '/responsible-persons',
  isAuthenticated,
  rpController.createResponsiblePerson,
);
router.put(
  '/responsible-persons/:id',
  isAuthenticated,
  rpController.updateResponsiblePerson,
);
router.delete(
  '/responsible-persons/:id',
  isAuthenticated,
  rpController.deleteResponsiblePerson,
);
router.get('/responsible-persons/:id', rpController.getResponsiblePerson);
router.get(
  '/responsible-persons',
  isAuthenticated,
  rpController.getAllResponsiblePersons,
);
router.get(
  '/responsible-persons/stream/:id',
  rpController.getResponsiblePersonsByStream,
);

const rpRoutes = Router();
rpRoutes.use(API_PREFIX, router);

export default rpRoutes;
