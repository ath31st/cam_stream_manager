import type React from 'react';

import type {
  NewResponsiblePerson,
  ResponsiblePerson,
  Stream,
  UpdateResponsiblePerson,
} from '../../../shared/api.types';
import AddResponsiblePersonModal from './AddResponsiblePersonModal';
import DeleteResponsiblePersonModal from './DeleteResponsiblePersonModal';
import UpdateResponsiblePersonModal from './UpdateResponsiblePersonModal';

const ResponsiblePersonModals: React.FC<{
  isAddVisible: boolean;
  isUpdateVisible: boolean;
  isDeleteVisible: boolean;
  selectedPerson: ResponsiblePerson | null;
  streams: Stream[];
  onAdd: (person: NewResponsiblePerson) => void;
  onUpdate: (person: UpdateResponsiblePerson) => void;
  onDelete: () => void;
  onCloseAdd: () => void;
  onCloseUpdate: () => void;
  onCloseDelete: () => void;
}> = ({
  isAddVisible,
  isUpdateVisible,
  isDeleteVisible,
  selectedPerson,
  streams,
  onAdd,
  onUpdate,
  onDelete,
  onCloseAdd,
  onCloseUpdate,
  onCloseDelete,
}) => (
  <>
    <AddResponsiblePersonModal
      visible={isAddVisible}
      streams={streams}
      onConfirm={onAdd}
      onCancel={onCloseAdd}
    />
    <UpdateResponsiblePersonModal
      visible={isUpdateVisible}
      person={selectedPerson}
      onConfirm={onUpdate}
      onCancel={onCloseUpdate}
    />
    <DeleteResponsiblePersonModal
      visible={isDeleteVisible}
      onConfirm={onDelete}
      onCancel={onCloseDelete}
    />
  </>
);

export default ResponsiblePersonModals;
