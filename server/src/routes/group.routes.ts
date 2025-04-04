import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth.middleware';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { groupController } from '../utils/init';

const router = Router();

router.post('/groups', isAuthenticated, groupController.createGroup);
router.put('/groups/:id', isAuthenticated, groupController.updateGroup);
router.delete('/groups/:id', isAuthenticated, groupController.deleteGroup);
router.get('/groups', groupController.getGroups);
router.get('/groups/:id', isAuthenticated, groupController.getGroup);

const groupRoutes = Router();
groupRoutes.use(API_PREFIX, router);

export default groupRoutes;
