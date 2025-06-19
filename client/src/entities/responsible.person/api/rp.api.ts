import axios from 'axios';
import type {
  NewResponsiblePerson,
  ResponsiblePerson,
  UpdateResponsiblePerson,
} from '../../../shared/api.types';

const API_URL = `${import.meta.env.VITE_API_URL}/responsible-persons`;

export const fetchResponsiblePerson = async (
  id: number,
): Promise<ResponsiblePerson> => {
  const response = await axios.get<ResponsiblePerson>(`${API_URL}/${id}`);
  return response.data;
};

export const fetchResponsiblePersons = async (): Promise<
  ResponsiblePerson[]
> => {
  const response = await axios.get<ResponsiblePerson[]>(API_URL);
  return response.data;
};

export const fetchResponsiblePersonsByStream = async (
  streamId: number,
): Promise<ResponsiblePerson[]> => {
  const response = await axios.get<ResponsiblePerson[]>(
    `${API_URL}/stream/${streamId}`,
  );
  return response.data;
};

export const createResponsiblePerson = async (
  person: NewResponsiblePerson,
): Promise<ResponsiblePerson> => {
  const response = await axios.post<ResponsiblePerson>(API_URL, person);
  return response.data;
};

export const updateResponsiblePerson = async (
  id: number,
  person: UpdateResponsiblePerson,
): Promise<ResponsiblePerson> => {
  const response = await axios.put<ResponsiblePerson>(
    `${API_URL}/${id}`,
    person,
  );
  return response.data;
};

export const deleteResponsiblePerson = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
