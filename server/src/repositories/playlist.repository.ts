import { PrismaClient } from '@prisma/client';
import { NewPlaylistDto, UpdatePlaylistDto } from '@shared/types';
import { Logger } from '../utils/logger';
import { PlaylistWithGroups } from '../types/extended.types';

export class PlaylistRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  findPlaylist = async (id: number): Promise<PlaylistWithGroups> => {
    return await this.prismaClient.playlist.findUniqueOrThrow({
      where: { id: id },
      include: { groups: true },
    });
  };

  existsPlaylistByName = async (name: string): Promise<boolean> => {
    const playlist = await this.prismaClient.$queryRaw<
      { id: number }[]
    >`SELECT * FROM "Playlist" WHERE UPPER("name") = UPPER(${name}) LIMIT 1`;

    return playlist.length > 0;
  };

  findPlaylists = async (
    groupIds: number[],
    isVisible?: boolean,
  ): Promise<PlaylistWithGroups[]> => {
    const playlistsWithGroups = await this.prismaClient.playlist.findMany({
      where: {
        ...(isVisible !== undefined && { isVisible: isVisible }),
        ...(groupIds && {
          groups: {
            some: {
              id: {
                in: groupIds,
              },
            },
          },
        }),
      },
      include: {
        groups: true,
      },
    });

    const playlistsWithoutGroups = await this.prismaClient.playlist.findMany({
      where: {
        ...(isVisible !== undefined && { isVisible: isVisible }),
        groups: {
          none: {},
        },
      },
      include: {
        groups: true,
      },
    });

    const combinedPlaylists = [...playlistsWithGroups, ...playlistsWithoutGroups];

    const uniquePlaylists = Array.from(
      new Map(combinedPlaylists.map((playlist) => [playlist.id, playlist])).values(),
    );

    return uniquePlaylists;
  };

  findAllPlaylists = async (isVisible?: boolean): Promise<PlaylistWithGroups[]> => {
    return await this.prismaClient.playlist.findMany({
      where: {
        ...(isVisible !== undefined && { isVisible: isVisible }),
      },
      include: { groups: true },
    });
  };

  createPlaylist = async (dto: NewPlaylistDto): Promise<PlaylistWithGroups> => {
    const playlist = await this.prismaClient.playlist.create({
      data: {
        name: dto.name,
        isVisible: true,
        ...(dto.groupIds && {
          groups: {
            connect: dto.groupIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        groups: true,
      },
    });
    Logger.log(playlist);
    return playlist;
  };

  updatePlaylist = async (dto: UpdatePlaylistDto): Promise<PlaylistWithGroups> => {
    const playlist = await this.prismaClient.playlist.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        isVisible: dto.isVisible,
        ...(dto.groupIds !== undefined && {
          groups: {
            set: [],
            connect: dto.groupIds.map((id) => ({ id })),
          },
        }),
      },
      include: { groups: true },
    });

    Logger.log(playlist);
    return playlist;
  };

  deletePlaylist = async (id: number) => {
    await this.prismaClient.playlist.delete({
      where: { id: id },
    });
    Logger.log(`Playlist with id ${id} has been deleted.`);
  };
}
