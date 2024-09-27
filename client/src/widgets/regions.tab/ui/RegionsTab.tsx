import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Spin, Alert } from 'antd';
import { useRegionStore } from '../../../app/stores/region.store';
import { Region } from '../../../entities/region';

const RegionsTab: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newRegionName, setNewRegionName] = useState<string>('');
  const [deleteRegionId, setDeleteRegionId] = useState<number | null>(null);

  const { regions, fetchAllRegions, loading, error, addRegion, removeRegion } =
    useRegionStore();

  useEffect(() => {
    fetchAllRegions();
  }, [fetchAllRegions]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (newRegionName) {
      await addRegion({ name: newRegionName });
      setNewRegionName('');
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showDeleteConfirm = (id: number) => {
    setDeleteRegionId(id);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteRegionId !== null) {
      await removeRegion(deleteRegionId);
      setDeleteRegionId(null);
      setIsModalVisible(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteRegionId(null);
    setIsModalVisible(false);
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
      render: (_: unknown, record: { key: number }) => (
        <span>
          <Button type="link">Редактировать</Button>
          <Button
            type="link"
            danger
            onClick={() => showDeleteConfirm(record.key)}
          >
            Удалить
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <h1>Управление регионами</h1>

      {error && (
        <Alert message="Ошибка" description={error} type="error" showIcon />
      )}
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Button type="primary" onClick={showModal}>
            Добавить регион
          </Button>
          <Table dataSource={dataSource} columns={columns} />

          <Modal
            title="Добавить новый регион"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Введите название региона:</p>
            <input
              value={newRegionName}
              onChange={(e) => setNewRegionName(e.target.value)}
              placeholder="Название региона"
            />
          </Modal>

          <Modal
            title="Подтвердите удаление"
            open={deleteRegionId !== null}
            onOk={handleDelete}
            onCancel={handleDeleteCancel}
          >
            <p>Вы уверены, что хотите удалить этот регион?</p>
          </Modal>
        </>
      )}
    </>
  );
};

export default RegionsTab;
