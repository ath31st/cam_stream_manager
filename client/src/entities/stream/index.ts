import { NewStreamDto, UpdateStreamDto, StreamDto } from '@shared/types';
import DeleteStreamModal from './ui/DeleteStreamModal';
import AddStreamModal from './ui/AddStreamModal';
import UpdateStreamModal from './ui/UpdateStreamModal';

export type Stream = StreamDto;
export type NewStream = NewStreamDto;
export type UpdateStream = UpdateStreamDto;

export { DeleteStreamModal, AddStreamModal, UpdateStreamModal };
export { useStreamStore } from './model/stream.store';
