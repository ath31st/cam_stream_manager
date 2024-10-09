import { EventDto, Page } from '@shared/types';
import { EventType } from './constants/event.type';
import { EventLevel } from './constants/event.level';

export type Event = EventDto;
export type { Page, EventLevel, EventType };
