import {
  ResponsiblePersonDto,
  NewResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '@shared/types';
import DeleteResponsiblePersonModal from './ui/DeleteResponsiblePersonModal';
import AddResponsiblePersonModal from './ui/AddResponsiblePersonModal';
import UpdateResponsiblePersonModal from './ui/UpdateResponsiblePersonModal';
import ResponsiblePersonModal from './ui/ResponsiblePersonModal';
import {
  fetchResponsiblePerson,
  fetchResponsiblePersons,
  fetchResponsiblePersonsByStream,
  createResponsiblePerson,
  updateResponsiblePerson,
  deleteResponsiblePerson,
} from './api/rp.api';

export type ResponsiblePerson = ResponsiblePersonDto;
export type NewResponsiblePerson = NewResponsiblePersonDto;
export type UpdateResponsiblePerson = UpdateResponsiblePersonDto;

export {
  fetchResponsiblePerson,
  fetchResponsiblePersons,
  fetchResponsiblePersonsByStream,
  createResponsiblePerson,
  updateResponsiblePerson,
  deleteResponsiblePerson,
};
export {
  DeleteResponsiblePersonModal,
  AddResponsiblePersonModal,
  UpdateResponsiblePersonModal,
  ResponsiblePersonModal,
};
