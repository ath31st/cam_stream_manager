import { Router } from 'express';
import { groupController } from '../utils/init';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

router.post('/groups', isAuthenticated, groupController.createGroup);
router.put('/groups/:id', isAuthenticated, groupController.updateGroup);
router.delete('/groups/:id', isAuthenticated, groupController.deleteGroup);
router.get('/groups', groupController.getGroups);
router.get('/groups/:id', isAuthenticated, groupController.getGroup);

const regionRoutes = Router();
regionRoutes.use(API_PREFIX, router);

export default regionRoutes;
