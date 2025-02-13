import React, { useEffect, useState } from 'react';
import { useRegionStore } from '../../../app/stores/region.store';
import { NewRegion, Region, UpdateRegion } from '../../../entities/region';
import { useStreamStore } from '../../../app/stores/stream.store';
import {
  errorNotification,
  successNotification,
} from '../../../shared/notifications';
import RegionsTable from './RegionsTable';
import RegionModals from './RegionModals';
import WideButton from '../../../shared/ui/buttons/WideButton';
import TabContainer from '../../../shared/ui/containers/TabContainer';
import LargeLoader from '../../../shared/ui/loaders/LargeLoader';
import { useGroupStore } from '../../../app/stores/group.store';

const RegionsTab: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [deleteRegionId, setDeleteRegionId] = useState<number | null>(null);
  const [updatingRegion, setUpdatingRegion] = useState<Region | null>(null);

  const { groups, fetchAllGroups } = useGroupStore();

  useEffect(() => {
    if (groups.length === 0) {
      fetchAllGroups();
    }
  }, [groups, fetchAllGroups]);

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

  const handleAddRegion = async (newRegion: NewRegion) => {
    const region = await addRegion(newRegion);
    if (useRegionStore.getState().error === null) {
      successNotification(
        'Регион добавлен',
        `Регион "${region?.name}" успешно добавлен.`,
      );
      setIsAddModalVisible(false);
    }
  };

  const showDeleteConfirm = (id: number) => {
    setDeleteRegionId(id);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteRegionId !== null) {
      await removeRegion(deleteRegionId);
      await fetchAllStreams();
      if (useRegionStore.getState().error === null) {
        successNotification('Регион удален', 'Регион успешно удален.');
      }
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
      if (useRegionStore.getState().error === null) {
        successNotification(
          'Регион обновлен',
          `Регион "${updatedRegion.name}" успешно обновлен.`,
        );
        setUpdatingRegion(null);
        setIsUpdateModalVisible(false);
      }
    }
  };

  return (
    <TabContainer>
      <>
        <WideButton onClick={() => setIsAddModalVisible(true)}>
          Добавить регион
        </WideButton>

        {loading ? (
          <LargeLoader />
        ) : (
          <RegionsTable
            regions={regions}
            onEdit={showUpdateModal}
            onDelete={showDeleteConfirm}
          />
        )}

        <RegionModals
          groups={groups}
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
    </TabContainer>
  );
};

export default RegionsTab;
