import { Request, Response } from 'express';
import { PlaylistService } from '../services/playlist.service';
import { NewPlaylistDto, UpdatePlaylistDto } from '@shared/types';
import {
  newPlaylistSchema,
  updatePlaylistSchema,
} from '../validators/playlist.validator';
import { trimObjectValues } from '../utils/trim.utils';
import { JwtPayload } from 'jsonwebtoken';
import { UserRoles } from '../utils/user.roles';

export class PlaylistController {
  private playlistService: PlaylistService;

  constructor(playlistService: PlaylistService) {
    this.playlistService = playlistService;
  }

  getPlaylist = async (req: Request, res: Response) => {
    try {
      const playlistId = Number(req.params.id);
      const playlistDto = await this.playlistService.getPlaylistDto(playlistId);
      res.status(200).json(playlistDto);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(404)
          .json({ message: 'Playlist not found', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to get playlist',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  getPlaylists = async (req: Request, res: Response) => {
    try {
      const user: JwtPayload | undefined = req.user;
      const isAdmin = user?.role === UserRoles.ADMIN;
      const groupIds: number[] = user?.groupIds || [];

      const isVisible =
        req.query?.isVisible !== undefined
          ? req.query.isVisible === 'true'
          : undefined;
          
      const playlistsDto = await this.playlistService.getPlaylistDtos(
        groupIds,
        isAdmin,
        isVisible,
      );
      res.status(200).json(playlistsDto);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          message: 'Failed to retrieve playlists',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to retrieve playlists',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  createPlaylist = async (req: Request, res: Response) => {
    try {
      const trimmedBody = trimObjectValues(req.body);

      const { error, value } = newPlaylistSchema.validate(trimmedBody);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const dto: NewPlaylistDto = value;
      const createdPlaylist = await this.playlistService.createPlaylist(dto);
      res.status(201).json(createdPlaylist);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Failed to create playlist', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to create playlist',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  updatePlaylist = async (req: Request, res: Response) => {
    try {
      const trimmedBody = trimObjectValues(req.body);

      const { error, value } = updatePlaylistSchema.validate({
        id: Number(req.params.id),
        ...trimmedBody,
      });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const dto: UpdatePlaylistDto = value;
      const updatedPlaylist = await this.playlistService.updatePlaylist(dto);
      res.status(200).json(updatedPlaylist);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Failed to update playlist', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to update playlist',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  deletePlaylist = async (req: Request, res: Response) => {
    try {
      const playlistId = Number(req.params.id);
      await this.playlistService.deletePlaylist(playlistId);
      res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Failed to delete playlist', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to delete playlist',
          error: 'Unknown error occurred',
        });
      }
    }
  };
}
