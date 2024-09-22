import React, { useEffect, useState } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { useRegionStore } from '../../../app/stores/region.store';
import { useStreamStore } from '../../../app/stores/stream.store';
import styles from './Sider.module.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

export const AppSider: React.FC = () => {
  const { regions, fetchAllRegions } = useRegionStore();
  const { streams, fetchStreamsByRegion, loading } = useStreamStore();
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);

  useEffect(() => {
    fetchAllRegions();
  }, [fetchAllRegions]);

  const handleRegionClick = (regionId: number) => {
    setSelectedRegionId(regionId);
    fetchStreamsByRegion(regionId);
  };

  return (
    <Sider className={styles['site-layout-background']}>
      <Menu mode="inline" className={styles.menu}>
        {regions.map((region) => (
          <SubMenu
            key={region.id}
            title={region.name}
            onTitleClick={() => handleRegionClick(region.id)}
          >
            {loading && selectedRegionId === region.id ? (
              <Spin />
            ) : (
              streams?.map((stream) => (
                <Menu.Item key={stream.id}>{stream.location}</Menu.Item>
              ))
            )}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  );
};
