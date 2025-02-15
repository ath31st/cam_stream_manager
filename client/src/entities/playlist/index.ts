import { PlaylistDto, NewPlaylistDto, UpdatePlaylistDto } from '@shared/types';
import AddPlaylistModal from './ui/AddPlaylistModal';
import DeletePlaylistModal from './ui/DeletePlaylistModal';
import UpdatePlaylistModal from './ui/UpdatePlaylistModal';
import {
  fetchPlaylists,
  fetchPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} from './api/playlist.api';

export type Playlist = PlaylistDto;
export type NewPlaylist = NewPlaylistDto;
export type UpdatePlaylist = UpdatePlaylistDto;

export {
  fetchPlaylists,
  fetchPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};
export { AddPlaylistModal, DeletePlaylistModal, UpdatePlaylistModal };
