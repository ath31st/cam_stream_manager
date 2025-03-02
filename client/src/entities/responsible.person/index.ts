import {
  ResponsiblePersonDto,
  NewResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '@shared/types';

export type ResponsiblePerson = ResponsiblePersonDto;
export type NewResponsiblePerson = NewResponsiblePersonDto;
export type UpdateResponsiblePerson = UpdateResponsiblePersonDto;

export { useResponsiblePersonStore } from './model/responsible.person.store';
