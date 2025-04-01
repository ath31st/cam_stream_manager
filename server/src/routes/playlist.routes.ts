import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth.middleware';
import { attachUserFromToken } from '../middleware/open.middleware';
import { API_PREFIX } from '../utils/constants/routes.constants';
import { playlistController } from '../utils/init';

const router = Router();

router.post('/playlists', isAuthenticated, playlistController.createPlaylist);
router.put(
  '/playlists/:id',
  isAuthenticated,
  playlistController.updatePlaylist,
);
router.delete(
  '/playlists/:id',
  isAuthenticated,
  playlistController.deletePlaylist,
);
router.get('/playlists', attachUserFromToken, playlistController.getPlaylists);
router.get('/playlists/:id', isAuthenticated, playlistController.getPlaylist);

const playlistRoutes = Router();
playlistRoutes.use(API_PREFIX, router);

export default playlistRoutes;
