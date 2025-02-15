export enum EventLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export enum EventType {
  PLAYLIST = 'PLAYLIST',
  STREAM = 'STREAM',
  RP = 'RP',
  USER = 'USER',
  GROUP = 'GROUP',
}

export interface NewEvent {
  type: EventType;
  level: EventLevel;
  info: string;
}
