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

const ResponsiblePersonsTab: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] =
    useState<ResponsiblePerson | null>(null);

  const {
    responsiblePersons,
    fetchResponsiblePersons,
    addResponsiblePerson,
    updateResponsiblePerson,
    removeResponsiblePerson,
  } = useResponsiblePersonStore();

  useEffect(() => {
    fetchResponsiblePersons();
  }, []);

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
      title: 'Stream ID',
      dataIndex: 'streamId',
      key: 'streamId',
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

      <Button type="primary" onClick={handleAddPerson}>
        Добавить ответственное лицо
      </Button>

      <Table dataSource={responsiblePersons} columns={columns} rowKey="id" />

      <AddResponsiblePersonModal
        visible={isAddModalVisible}
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
