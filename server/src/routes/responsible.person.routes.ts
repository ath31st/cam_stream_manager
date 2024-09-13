import { Router } from 'express';
import { rpController } from '../utils/init';

const router = Router();

router.post('/responsible_persons', rpController.createResponsiblePerson);
router.put('/responsible_persons/:id', rpController.updateResponsiblePerson);
router.delete('/responsible_persons/:id', rpController.deleteResponsiblePerson);
router.get('/responsible_persons/:id', rpController.getResponsiblePerson);

const rpRoutes = Router();
const apiPrefix = '/api/v1';
rpRoutes.use(apiPrefix, router);

export default rpRoutes;
