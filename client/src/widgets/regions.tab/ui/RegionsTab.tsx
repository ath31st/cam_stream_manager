import React, { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import { useRegionStore } from '../../../app/stores/regionStore';
import { Region, UpdateRegion } from '../../../entities/region';
import { useStreamStore } from '../../../app/stores/streamStore';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import RegionsTable from './RegionsTable';
import RegionModals from './RegionModals';

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
    successNotification(
      'Регион добавлен',
      `Регион "${name}" успешно добавлен.`,
    );
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
      successNotification('Регион удален', 'Регион успешно удален.');
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
      successNotification(
        'Регион обновлен',
        `Регион "${updatedRegion.name}" успешно обновлен.`,
      );
      setUpdatingRegion(null);
      setIsUpdateModalVisible(false);
    }
  };

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
          <RegionsTable
            regions={regions}
            onEdit={showUpdateModal}
            onDelete={showDeleteConfirm}
          />
          <RegionModals
            isAddModalVisible={isAddModalVisible}
            isDeleteModalVisible={isDeleteModalVisible}
            isUpdateModalVisible={isUpdateModalVisible}
            updatingRegion={updatingRegion}
            deleteRegionId={deleteRegionId}
            onAdd={handleAddRegion}
            onDelete={handleDelete}
            onUpdate={handleUpdateRegion}
            onCloseAdd={() => setIsAddModalVisible(false)}
            onCloseDelete={() => {
              setDeleteRegionId(null);
              setIsDeleteModalVisible(false);
            }}
            onCloseUpdate={() => {
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
