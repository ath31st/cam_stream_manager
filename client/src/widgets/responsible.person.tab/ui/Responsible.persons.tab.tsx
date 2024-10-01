import React, { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import { useResponsiblePersonStore } from '../../../app/stores/responsible.person.store';
import {
  ResponsiblePerson,
  NewResponsiblePerson,
  UpdateResponsiblePerson,
  DeleteResponsiblePersonModal,
  AddResponsiblePersonModal,
  UpdateResponsiblePersonModal,
} from '../../../entities/responsible.person';
import { useStreamStore } from '../../../app/stores/stream.store';
import { StreamSelect } from '../../../shared/StreamSelect';

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
  } = useResponsiblePersonStore();
  const { streams, fetchAllStreams } = useStreamStore();

  useEffect(() => {
    fetchAllStreams();
    fetchResponsiblePersons();
  }, [fetchResponsiblePersons, fetchAllStreams]);

  const handleAddPerson = () => {
    setIsAddModalVisible(true);
  };

  const handleSavePerson = async (person: NewResponsiblePerson) => {
    await addResponsiblePerson(person);
    setIsAddModalVisible(false);
  };

  const handleUpdatePerson = async (person: UpdateResponsiblePerson) => {
    if (selectedPerson) {
      await updateResponsiblePerson(selectedPerson.id, person);
      setIsUpdateModalVisible(false);
    }
  };

  const handleDeletePerson = async () => {
    if (selectedPerson !== null) {
      await removeResponsiblePerson(selectedPerson.id);
      setIsDeleteModalVisible(false);
    }
  };

  const filteredResponsiblePersons = selectedStreamId
    ? responsiblePersons.filter(
        (person) => person.streamId === selectedStreamId,
      )
    : responsiblePersons;

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Местоположение',
      dataIndex: 'streamId',
      key: 'streamId',
      render: (streamId: number) => {
        const stream = streams.find((s) => s.id === streamId);
        return stream ? stream.location : 'Неизвестный стрим';
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (text: string, record: ResponsiblePerson) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSelectedPerson(record);
              setIsUpdateModalVisible(true);
            }}
          >
            Редактировать
          </Button>
          <Button
            danger
            onClick={() => {
              setSelectedPerson(record);
              setIsDeleteModalVisible(true);
            }}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

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

      <Table
        dataSource={filteredResponsiblePersons}
        columns={columns}
        rowKey="id"
      />

      <AddResponsiblePersonModal
        visible={isAddModalVisible}
        streams={streams}
        onConfirm={handleSavePerson}
        onCancel={() => setIsAddModalVisible(false)}
      />

      <UpdateResponsiblePersonModal
        visible={isUpdateModalVisible}
        person={selectedPerson}
        onConfirm={handleUpdatePerson}
        onCancel={() => setIsUpdateModalVisible(false)}
      />

      <DeleteResponsiblePersonModal
        visible={isDeleteModalVisible}
        onConfirm={handleDeletePerson}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
    </>
  );
};

export default ResponsiblePersonsTab;
