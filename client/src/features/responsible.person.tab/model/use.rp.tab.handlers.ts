import { useEffect, useState } from 'react';
import { useResponsiblePersonStore } from '../../../entities/responsible.person';
import { useStreamStore } from '../../../entities/stream';
import type {
  NewResponsiblePerson,
  ResponsiblePerson,
  UpdateResponsiblePerson,
} from '../../../shared/api.types';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import { useFilterResponsiblePersons } from '../lib/use.filter.rp';

const useRpTabHandlers = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] =
    useState<ResponsiblePerson | null>(null);
  const [selectedStreamId, setSelectedStreamId] = useState<number | null>(null);

  const {
    responsiblePersons,
    fetchResponsiblePersons,
    addResponsiblePerson,
    updateResponsiblePerson,
    removeResponsiblePerson,
    error,
    clearError,
    loading,
  } = useResponsiblePersonStore();
  const { streams, fetchAllStreams } = useStreamStore();

  useEffect(() => {
    if (error) {
      errorNotification(
        'Ошибка в работе с ответсвенными лицами',
        clearError,
        error,
      );
    }
  }, [error, clearError]);

  useEffect(() => {
    fetchAllStreams();
    fetchResponsiblePersons();
  }, [fetchResponsiblePersons, fetchAllStreams]);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleAddPerson = async (person: NewResponsiblePerson) => {
    await addResponsiblePerson(person);
    if (useResponsiblePersonStore.getState().error === null) {
      successNotification(
        'Ответсвенное лицо добавлено',
        `Ответсвенное лицо "${person.name}" успешно добавлено.`,
      );
      setIsAddModalVisible(false);
    }
  };

  const showUpdateModal = (person: ResponsiblePerson) => {
    setSelectedPerson(person);
    setIsUpdateModalVisible(true);
  };

  const closeUpdateModal = () => {
    setSelectedPerson(null);
    setIsUpdateModalVisible(false);
  };

  const handleUpdatePerson = async (person: UpdateResponsiblePerson) => {
    if (selectedPerson) {
      await updateResponsiblePerson(selectedPerson.id, person);
      if (useResponsiblePersonStore.getState().error === null) {
        successNotification(
          'Ответсвенное лицо обновлено',
          `Ответсвенное лицо "${person.name}" успешно обновлено.`,
        );
        setIsUpdateModalVisible(false);
      }
    }
  };

  const showDeleteModal = (person: ResponsiblePerson) => {
    setSelectedPerson(person);
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setSelectedPerson(null);
    setIsDeleteModalVisible(false);
  };

  const handleDeletePerson = async () => {
    if (selectedPerson !== null) {
      await removeResponsiblePerson(selectedPerson.id);
      if (useResponsiblePersonStore.getState().error === null) {
        successNotification(
          'Ответсвенное лицо удалено',
          'Ответсвенное лицо успешно удалено.',
        );
      }
      setIsDeleteModalVisible(false);
    }
  };

  const filteredResponsiblePersons = useFilterResponsiblePersons(
    selectedStreamId,
    responsiblePersons,
  );

  return {
    modals: {
      isAddModalVisible,
      showAddModal,
      closeAddModal,
      isUpdateModalVisible,
      showUpdateModal,
      closeUpdateModal,
      isDeleteModalVisible,
      showDeleteModal,
      closeDeleteModal,
    },
    actions: {
      handleAddPerson,
      handleUpdatePerson,
      handleDeletePerson,
    },
    state: {
      streams,
      loading,
      filteredResponsiblePersons,
      selectedPerson,
      selectedStreamId,
    },
    setters: {
      setSelectedStreamId,
    },
  };
};

export default useRpTabHandlers;
