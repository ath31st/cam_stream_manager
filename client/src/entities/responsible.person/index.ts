import {
  ResponsiblePersonDto,
  NewResponsiblePersonDto,
  UpdateResponsiblePersonDto,
} from '@shared/types';
import DeleteResponsiblePersonModal from './ui/DeleteResponsiblePersonModal';
import AddResponsiblePersonModal from './ui/AddResponsiblePersonModal';
import UpdateResponsiblePersonModal from './ui/UpdateResponsiblePersonModal';
import ResponsiblePersonModal from './ui/ResponsiblePersonModal';

export type ResponsiblePerson = ResponsiblePersonDto;
export type NewResponsiblePerson = NewResponsiblePersonDto;
export type UpdateResponsiblePerson = UpdateResponsiblePersonDto;

export {
  DeleteResponsiblePersonModal,
  AddResponsiblePersonModal,
  UpdateResponsiblePersonModal,
  ResponsiblePersonModal,
};
