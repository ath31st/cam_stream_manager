import { PrismaClient, Event } from '@prisma/client';
import { Logger } from '../utils/logger';
import { EventLevel, EventType } from '../types/event.types';
import { Page } from '@shared/types';

export class EventRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  findEvent = async (id: number): Promise<Event> => {
    return await this.prismaClient.event.findUniqueOrThrow({
      where: { id: id },
    });
  };

  async findEvents(
    page: number = 1,
    pageSize: number = 10,
    type?: EventType,
    level?: EventLevel,
  ): Promise<Page<Event>> {
    const skip = (page - 1) * pageSize;

    const [items, totalItems] = await Promise.all([
      this.prismaClient.event.findMany({
        take: pageSize,
        skip,
        where: {
          ...(type && { type }),
          ...(level && { level }),
        },
        orderBy: { id: 'desc' },
      }),
      this.prismaClient.event.count({
        where: {
          ...(type && { type }),
          ...(level && { level }),
        },
      }),
    ]);

    return {
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      currentPage: page,
      pageSize,
    };
  }

  createEvent = async (
    type: string,
    level: EventLevel,
    info: string,
  ): Promise<Event> => {
    const event = await this.prismaClient.event.create({
      data: {
        type,
        level,
        info,
      },
    });
    Logger.log(event);
    return event;
  };

  deleteEvent = async (id: number) => {
    await this.prismaClient.event.delete({
      where: { id },
    });
    Logger.log(`Event with id ${id} has been deleted.`);
  };
}
