import React, { useEffect } from 'react';
import { useRegionStore } from '../../../app/stores/region.store';
import { RegionItem } from './RegionItem';
import { Spin, Alert } from 'antd';

export const RegionList: React.FC = () => {
  const { regions, fetchAllRegions, loading, error } = useRegionStore();

  useEffect(() => {
    fetchAllRegions();
  }, [fetchAllRegions]);

  if (loading) return <Spin />;
  if (error) return <Alert message="Ошибка загрузки регионов" type="error" />;

  return (
    <div>
      {regions.map((region) => (
        <RegionItem key={region.id} region={region} />
      ))}
    </div>
  );
};
