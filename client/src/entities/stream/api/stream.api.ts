import axios from 'axios';
import type { NewStream, Stream, UpdateStream } from '@/shared/api.types';

const API_URL = `${import.meta.env.VITE_API_URL}/streams`;

export const fetchStreams = async (): Promise<Stream[]> => {
  const response = await axios.get<Stream[]>(API_URL);
  return response.data;
};

export const fetchStreamsByPlaylist = async (playlistId: number) => {
  const response = await axios.get<Stream[]>(
    `${API_URL}/playlist/${playlistId}`,
  );
  return response.data;
};

export const fetchStream = async (id: number): Promise<Stream> => {
  const response = await axios.get<Stream>(`${API_URL}/${id}`);
  return response.data;
};

export const createStream = async (stream: NewStream): Promise<Stream> => {
  const response = await axios.post<Stream>(API_URL, stream);
  return response.data;
};

export const updateStream = async (
  id: number,
  stream: UpdateStream,
): Promise<Stream> => {
  const response = await axios.put<Stream>(`${API_URL}/${id}`, stream);
  return response.data;
};

export const deleteStream = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
