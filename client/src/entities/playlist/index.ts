import { PlaylistDto, NewPlaylistDto, UpdatePlaylistDto } from '@shared/types';
import AddPlaylistModal from './ui/AddPlaylistModal';
import DeletePlaylistModal from './ui/DeletePlaylistModal';
import UpdatePlaylistModal from './ui/UpdatePlaylistModal';

export type Playlist = PlaylistDto;
export type NewPlaylist = NewPlaylistDto;
export type UpdatePlaylist = UpdatePlaylistDto;

export { AddPlaylistModal, DeletePlaylistModal, UpdatePlaylistModal };
export { usePlaylistStore } from './model/playlist.store';
