import { PlaylistRepository } from '../repositories/playlist.repository';
import { NewPlaylistDto, PlaylistDto, UpdatePlaylistDto } from '@shared/types';
import { toPlaylistDto, toPlaylistDtos } from '../mappers/playlist.mapper';
import { Logger } from '../utils/logger';
import { EventService } from './event.service';
import { EventLevel, EventType, NewEvent } from '../types/event.types';
import { PlaylistWithGroups } from '../types/extended.types';

export class PlaylistService {
  private playlistRepository: PlaylistRepository;
  private eventService: EventService;

  constructor(playlistRepository: PlaylistRepository, eventService: EventService) {
    this.playlistRepository = playlistRepository;
    this.eventService = eventService;
  }

  getPlaylist = async (id: number): Promise<PlaylistWithGroups> => {
    try {
      return await this.playlistRepository.findPlaylist(id);
    } catch (error) {
      Logger.error(`Error finding playlist with id ${id}:`, error);
      throw new Error('Playlist not found');
    }
  };

  getPlaylistDto = async (id: number): Promise<PlaylistDto> => {
    return this.getPlaylist(id).then(toPlaylistDto);
  };

  getPlaylists = async (
    groupIds: number[],
    isVisible?: boolean,
  ): Promise<PlaylistWithGroups[]> => {
    try {
      return await this.playlistRepository.findPlaylists(groupIds, isVisible);
    } catch (error) {
      Logger.error('Error getting playlists:', error);
      throw new Error('Cannot get all playlists');
    }
  };

  getAllPlaylists = async (
    isVisible: boolean | undefined,
  ): Promise<PlaylistWithGroups[]> => {
    try {
      return await this.playlistRepository.findAllPlaylists(isVisible);
    } catch (error) {
      Logger.error('Error getting playlists:', error);
      throw new Error('Cannot get all playlists');
    }
  };

  getPlaylistDtos = async (
    groupIds: number[],
    isAdmin: boolean,
    isVisible: boolean | undefined,
  ): Promise<PlaylistDto[]> => {
    if (isAdmin) {
      return await this.getAllPlaylists(isVisible).then(toPlaylistDtos);
    } else {
      return await this.getPlaylists(groupIds, isVisible).then(toPlaylistDtos);
    }
  };

  existsPlaylistByName = async (name: string): Promise<void> => {
    const playlistExists = await this.playlistRepository.existsPlaylistByName(name);
    if (playlistExists) {
      throw new Error('Playlist already exists');
    }
  };

  createPlaylist = async (dto: NewPlaylistDto): Promise<PlaylistDto> => {
    try {
      await this.existsPlaylistByName(dto.name);
      const playlist = await this.playlistRepository
        .createPlaylist(dto)
        .then(toPlaylistDto);

      await this.logPlaylistEvent(EventLevel.INFO, `Playlist ${dto.name} created`);

      return playlist;
    } catch (error) {
      Logger.error('Error creating playlist:', error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Could not create playlist');
    }
  };

  updatePlaylist = async (dto: UpdatePlaylistDto): Promise<PlaylistDto> => {
    try {
      const playlist = await this.getPlaylist(dto.id);
      const playlistExists = await this.playlistRepository.existsPlaylistByName(
        dto.name,
      );

      if (playlistExists && playlist.name !== dto.name) {
        throw new Error('Playlist with this name already exists');
      }

      const updatedPlaylist = await this.playlistRepository
        .updatePlaylist(dto)
        .then(toPlaylistDto);

      await this.logPlaylistEvent(EventLevel.INFO, `Playlist ${dto.name} updated`);

      return updatedPlaylist;
    } catch (error) {
      Logger.error('Error updating playlist:', error);
      throw new Error('Could not update playlist');
    }
  };

  deletePlaylist = async (playlistId: number) => {
    try {
      await this.playlistRepository.deletePlaylist(playlistId);

      await this.logPlaylistEvent(
        EventLevel.INFO,
        `Playlist with id: ${playlistId} deleted`,
      );
    } catch (error) {
      Logger.error('Error deleting playlist:', error);
      throw new Error('Could not delete playlist');
    }
  };

  private logPlaylistEvent = async (level: EventLevel, info: string) => {
    const event: NewEvent = { type: EventType.PLAYLIST, level, info };
    await this.eventService.createEvent(event);
  };
}
