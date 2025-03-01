import {
  ResponsiblePersonDto,
  NewResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '@shared/types';
import DeleteResponsiblePersonModal from './ui/DeleteResponsiblePersonModal';
import AddResponsiblePersonModal from './ui/AddResponsiblePersonModal';
import UpdateResponsiblePersonModal from './ui/UpdateResponsiblePersonModal';
import ResponsiblePersonModal from './ui/ResponsiblePersonModal';
import ResponsiblePersonList from './ui/ResponsiblePersonList ';

export type ResponsiblePerson = ResponsiblePersonDto;
export type NewResponsiblePerson = NewResponsiblePersonDto;
export type UpdateResponsiblePerson = UpdateResponsiblePersonDto;

export {
  DeleteResponsiblePersonModal,
  AddResponsiblePersonModal,
  UpdateResponsiblePersonModal,
  ResponsiblePersonModal,
  ResponsiblePersonList,
};
export { useResponsiblePersonStore } from './model/responsible.person.store';
