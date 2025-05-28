export const StreamStatus = {
  Active: 'active' as const,
  NoConnection: 'noConnection' as const,
  BadConnection: 'badConnection' as const,
};

export type StreamStatusType = (typeof StreamStatus)[keyof typeof StreamStatus];
