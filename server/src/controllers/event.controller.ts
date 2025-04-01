import type { Request, Response } from 'express';
import type { EventService } from '../services/event.service';
import type { EventLevel, EventType } from '../types/event.types';

export class EventController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  getEvents = async (req: Request, res: Response): Promise<void> => {
    const { page, pageSize, type, level } = req.query;

    try {
      const eventPage = await this.eventService.getEventPage(
        page ? Number(page) : undefined,
        pageSize ? Number(pageSize) : undefined,
        type as EventType,
        level as EventLevel,
      );

      res.status(200).json(eventPage);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          message: 'Failed to get events',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to get events',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const eventId = Number(req.params.id);
      await this.eventService.deleteEvent(eventId);
      res.status(204).json({ message: 'Event deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          message: 'Failed to delete event',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to delete event',
          error: 'Unknown error occurred',
        });
      }
    }
  };
}
