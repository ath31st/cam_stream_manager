import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { useResponsiblePersonStore } from '../../../app/stores/responsible.person.store';
import {
  ResponsiblePerson,
  NewResponsiblePerson,
  UpdateResponsiblePerson,
} from '../../../entities/responsible.person';
import { useStreamStore } from '../../../app/stores/stream.store';
import { StreamSelect } from '../../../shared/stream.select';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import ResponsiblePersonModals from './ResponsiblePersonModals';
import ResponsiblePersonsTable from './ResponsiblePersonsTable';
import { useFilterResponsiblePersons } from '../lib/use.filter.rp';

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
    successNotification(
      'Ответсвенное лицо добавлено',
      `Ответсвенное лицо "${person.name}" успешно добавлено.`,
    );
    setIsAddModalVisible(false);
  };

  const handleUpdatePerson = async (person: UpdateResponsiblePerson) => {
    if (selectedPerson) {
      await updateResponsiblePerson(selectedPerson.id, person);
      successNotification(
        'Ответсвенное лицо обновлено',
        `Ответсвенное лицо "${person.name}" успешно обновлено.`,
      );
      setIsUpdateModalVisible(false);
    }
  };

  const handleDeletePerson = async () => {
    if (selectedPerson !== null) {
      await removeResponsiblePerson(selectedPerson.id);
      successNotification(
        'Ответсвенное лицо удалено',
        `Ответсвенное лицо успешно удалено.`,
      );
      setIsDeleteModalVisible(false);
    }
  };

  const filteredResponsiblePersons = useFilterResponsiblePersons(
    selectedStreamId,
    responsiblePersons,
  );

  return (
    <>
      <h1>Ответственные лица</h1>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddPerson}>
          Добавить ответственное лицо
        </Button>
        <StreamSelect
          streams={streams}
          onChange={(value) => setSelectedStreamId(value)}
        />
      </Space>
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
    </>
  );
};

export default ResponsiblePersonsTab;
