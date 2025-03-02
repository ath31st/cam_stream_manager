import { NewStreamDto, UpdateStreamDto, StreamDto } from '@shared/types';

export type Stream = StreamDto;
export type NewStream = NewStreamDto;
export type UpdateStream = UpdateStreamDto;

export { useStreamStore } from './model/stream.store';
