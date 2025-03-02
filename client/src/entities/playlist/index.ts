import { PlaylistDto, NewPlaylistDto, UpdatePlaylistDto } from '@shared/types';

export type Playlist = PlaylistDto;
export type NewPlaylist = NewPlaylistDto;
export type UpdatePlaylist = UpdatePlaylistDto;

export { usePlaylistStore } from './model/playlist.store';
