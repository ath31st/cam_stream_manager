import { EventDto, Page } from '@shared/types';
import { EventType } from './constants/event.type';
import { EventLevel } from './constants/event.level';
import { fetchEvents, deleteEvent } from './api/event.api';

export type { Page, EventLevel, EventType, EventDto };
export { fetchEvents, deleteEvent };
