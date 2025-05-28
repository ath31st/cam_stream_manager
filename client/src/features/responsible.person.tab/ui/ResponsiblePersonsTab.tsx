import { Space } from 'antd';
import type React from 'react';
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
import {
  LargeLoader,
  StreamSelect,
  TabContainer,
  WideButton,
} from '../../../shared/ui';
import { useFilterResponsiblePersons } from '../lib/use.filter.rp';
import ResponsiblePersonModals from './ResponsiblePersonModals';
import ResponsiblePersonsTable from './ResponsiblePersonsTable';

const ResponsiblePersonsTab: React.FC = () => {
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

  const handleAddPerson = () => {
    setIsAddModalVisible(true);
  };

  const handleSavePerson = async (person: NewResponsiblePerson) => {
    await addResponsiblePerson(person);
    if (useResponsiblePersonStore.getState().error === null) {
      successNotification(
        'Ответсвенное лицо добавлено',
        `Ответсвенное лицо "${person.name}" успешно добавлено.`,
      );
      setIsAddModalVisible(false);
    }
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

  return (
    <TabContainer>
      <Space>
        <WideButton onClick={handleAddPerson}>
          Добавить ответственное лицо
        </WideButton>
        <StreamSelect
          streams={streams}
          onChange={(value) => setSelectedStreamId(value)}
        />
      </Space>

      {loading ? (
        <LargeLoader />
      ) : (
        <ResponsiblePersonsTable
          persons={filteredResponsiblePersons}
          streams={streams}
          onEdit={(person) => {
            setIsUpdateModalVisible(true);
            setSelectedPerson(person);
          }}
          onDelete={(person) => {
            setIsDeleteModalVisible(true);
            setSelectedPerson(person);
          }}
        />
      )}

      <ResponsiblePersonModals
        isAddVisible={isAddModalVisible}
        isUpdateVisible={isUpdateModalVisible}
        isDeleteVisible={isDeleteModalVisible}
        selectedPerson={selectedPerson}
        streams={streams}
        onAdd={handleSavePerson}
        onUpdate={handleUpdatePerson}
        onDelete={handleDeletePerson}
        onCloseAdd={() => setIsAddModalVisible(false)}
        onCloseUpdate={() => setIsUpdateModalVisible(false)}
        onCloseDelete={() => setIsDeleteModalVisible(false)}
      />
    </TabContainer>
  );
};

export default ResponsiblePersonsTab;
