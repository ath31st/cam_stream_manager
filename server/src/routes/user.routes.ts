import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth.middleware';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { userController } from '../utils/init';

const router = Router();

router.post('/users', userController.createUser);
router.put('/users/:id', isAuthenticated, userController.updateUser);
router.delete('/users/:id', isAuthenticated, userController.deleteUser);
router.get('/users', isAuthenticated, userController.getAllUsers);
router.get('/users/:id', isAuthenticated, userController.getUser);
router.put(
  '/users/:id/password',
  isAuthenticated,
  userController.changePassword,
);

const userRoutes = Router();
userRoutes.use(API_PREFIX, router);

export default userRoutes;
