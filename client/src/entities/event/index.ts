import { EventDto, Page } from '@shared/types';
import { EventType } from './constants/event.type';
import { EventLevel } from './constants/event.level';

export type { Page, EventDto };
export { EventLevel, EventType };
export { useEventStore } from './model/event.store';
