import axios from 'axios';
import type {
  NewPlaylist,
  Playlist,
  UpdatePlaylist,
} from '../../../shared/api.types';

const API_URL = `${process.env.REACT_APP_API_URL}/playlists`;

export const fetchPlaylists = async (
  isVisible?: boolean,
): Promise<Playlist[]> => {
  const response = await axios.get<Playlist[]>(API_URL, {
    params: { isVisible },
  });
  return response.data;
};

export const fetchPlaylist = async (id: number): Promise<Playlist> => {
  const response = await axios.get<Playlist>(`${API_URL}/${id}`);
  return response.data;
};

export const createPlaylist = async (
  playlist: NewPlaylist,
): Promise<Playlist> => {
  const response = await axios.post<Playlist>(API_URL, playlist);
  return response.data;
};

export const updatePlaylist = async (
  id: number,
  playlist: UpdatePlaylist,
): Promise<Playlist> => {
  const response = await axios.put<Playlist>(`${API_URL}/${id}`, playlist);
  return response.data;
};

export const deletePlaylist = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
