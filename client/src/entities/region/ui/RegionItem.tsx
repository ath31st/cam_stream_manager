import React from 'react';
import { Button, Card, Switch, Spin } from 'antd';
import { useRegionStore } from '../../../app/stores/region.store';
import { Region } from '../index';

interface RegionItemProps {
  region: Region;
}

export const RegionItem: React.FC<RegionItemProps> = ({ region }) => {
  const { editRegion, removeRegion, loading } = useRegionStore();

  const handleVisibilityToggle = (checked: boolean) => {
    editRegion(region.id, { id: region.id, isVisible: checked });
  };

  const handleDelete = () => {
    removeRegion(region.id);
  };

  return (
    <Card title={region.name} style={{ marginBottom: 16 }}>
      {loading ? (
        <Spin />
      ) : (
        <>
          <p>ID: {region.id}</p>
          <p>
            Видимость:{' '}
            <Switch
              checked={region.isVisible}
              onChange={handleVisibilityToggle}
            />
          </p>
          <Button
            type="primary"
            onClick={() => console.log('Редактировать регион')}
          >
            Редактировать
          </Button>
          <Button
            type="default"
            danger
            onClick={handleDelete}
            style={{ marginLeft: 8 }}
          >
            Удалить
          </Button>
        </>
      )}
    </Card>
  );
};
