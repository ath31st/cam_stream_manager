import { Router } from 'express';
import { userController } from '../utils/init';
import { API_PREFIX } from '../utils/constants/routes.constants';

const router = Router();

router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id/password', userController.changePassword);

const userRoutes = Router();
userRoutes.use(API_PREFIX, router);

export default userRoutes;
