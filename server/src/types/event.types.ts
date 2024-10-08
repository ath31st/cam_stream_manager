export enum EventLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export enum EventType {
  REGION = 'REGION',
  STREAM = 'STREAM',
  RP = 'RP',
}

export interface NewEvent {
  type: EventType;
  level: EventLevel;
  info: string;
}
