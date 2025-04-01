import type { PlaylistDto } from '@shared/types';
import type { PlaylistWithGroups } from '../types/extended.types';

export const toPlaylistDto = (playlist: PlaylistWithGroups): PlaylistDto => {
  return {
    id: playlist.id,
    name: playlist.name,
    isVisible: playlist.isVisible,
    groupIds: playlist.groups.map((group) => group.id),
  };
};

export const toPlaylistDtos = (
  playlists: PlaylistWithGroups[],
): PlaylistDto[] => {
  return playlists.map(toPlaylistDto);
};
