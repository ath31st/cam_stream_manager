import { NewStreamDto, UpdateStreamDto, StreamDto } from '@shared/types';
import DeleteStreamModal from './ui/DeleteStreamModal';
import AddStreamModal from './ui/AddStreamModal';
import UpdateStreamModal from './ui/UpdateStreamModal';
import {
  fetchStream,
  fetchStreams,
  createStream,
  updateStream,
  deleteStream,
  fetchStreamsByPlaylist,
} from './api/stream.api';

export type Stream = StreamDto;
export type NewStream = NewStreamDto;
export type UpdateStream = UpdateStreamDto;

export {
  fetchStream,
  fetchStreams,
  createStream,
  updateStream,
  deleteStream,
  fetchStreamsByPlaylist,
};
export { DeleteStreamModal, AddStreamModal, UpdateStreamModal };
