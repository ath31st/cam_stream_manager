import React, { useEffect, useState } from 'react';
import { Button, Table, Spin, Space } from 'antd';
import { useRegionStore } from '../../../app/stores/region.store';
import {
  Region,
  AddRegionModal,
  DeleteRegionModal,
  UpdateRegionModal,
  UpdateRegion,
} from '../../../entities/region';
import { useStreamStore } from '../../../app/stores/stream.store';
import { errorNotification } from '../../../shared/notifications';

const RegionsTab: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [deleteRegionId, setDeleteRegionId] = useState<number | null>(null);
  const [updatingRegion, setUpdatingRegion] = useState<Region | null>(null);

  const {
    regions,
    fetchAllRegions,
    loading,
    error,
    addRegion,
    updateRegion,
    removeRegion,
    clearError,
  } = useRegionStore();
  const { fetchAllStreams } = useStreamStore();

  useEffect(() => {
    if (error) {
      errorNotification('Ошибка в работе с регионами', clearError, error);
    }
  }, [error, clearError]);

  useEffect(() => {
    fetchAllRegions();
  }, [fetchAllRegions]);

  const handleAddRegion = async (name: string) => {
    await addRegion({ name });
    setIsAddModalVisible(false);
  };

  const showDeleteConfirm = (id: number) => {
    setDeleteRegionId(id);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteRegionId !== null) {
      await removeRegion(deleteRegionId);
      await fetchAllStreams();
      setDeleteRegionId(null);
      setIsDeleteModalVisible(false);
    }
  };

  const showUpdateModal = (region: Region) => {
    setUpdatingRegion(region);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateRegion = async (updatedRegion: UpdateRegion) => {
    if (updatingRegion) {
      await updateRegion(updatingRegion.id, updatedRegion);
      setUpdatingRegion(null);
      setIsUpdateModalVisible(false);
    }
  };

  const dataSource = regions.map((region: Region) => ({
    key: region.id,
    name: region.name,
    isVisible: region.isVisible ? 'Да' : 'Нет',
  }));

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Видимость',
      dataIndex: 'isVisible',
      key: 'isVisible',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_: unknown, record: { key: number }) => {
        const region = regions.find((r) => r.id === record.key);
        return (
          <Space size={'middle'}>
            <Button onClick={() => showUpdateModal(region!)}>
              Редактировать
            </Button>
            <Button danger onClick={() => showDeleteConfirm(record.key)}>
              Удалить
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <h1>Управление регионами</h1>

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
            Добавить регион
          </Button>
          <Table dataSource={dataSource} columns={columns} />

          <AddRegionModal
            visible={isAddModalVisible}
            onOk={handleAddRegion}
            onCancel={() => setIsAddModalVisible(false)}
          />

          <DeleteRegionModal
            visible={isDeleteModalVisible}
            onConfirm={handleDelete}
            onCancel={() => {
              setDeleteRegionId(null);
              setIsDeleteModalVisible(false);
            }}
          />

          <UpdateRegionModal
            visible={isUpdateModalVisible}
            region={updatingRegion}
            onOk={handleUpdateRegion}
            onCancel={() => {
              setUpdatingRegion(null);
              setIsUpdateModalVisible(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default RegionsTab;
