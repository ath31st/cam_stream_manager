import axios from 'axios';
import {
  NewResponsiblePerson,
  UpdateResponsiblePerson,
  ResponsiblePerson,
} from '../index';

const API_URL = '/api/v1/responsible-persons';

export const fetchResponsiblePerson = async (
  id: number,
): Promise<ResponsiblePerson> => {
  const response = await axios.get<ResponsiblePerson>(`${API_URL}/${id}`);
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