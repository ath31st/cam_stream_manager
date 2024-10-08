import { PrismaClient, Event } from '@prisma/client';
import { Logger } from '../utils/logger';
import { EventLevel } from '../utils/event.level';

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

  findAllEvents = async (): Promise<Event[]> => {
    return await this.prismaClient.event.findMany();
  };

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
