import { Router } from 'express';
import { rpController } from '../utils/init';

const router = Router();

router.post('/responsible-persons', rpController.createResponsiblePerson);
router.put('/responsible-persons/:id', rpController.updateResponsiblePerson);
router.delete('/responsible-persons/:id', rpController.deleteResponsiblePerson);
router.get('/responsible-persons/:id', rpController.getResponsiblePerson);

const rpRoutes = Router();
const apiPrefix = '/api/v1';
rpRoutes.use(apiPrefix, router);

export default rpRoutes;
