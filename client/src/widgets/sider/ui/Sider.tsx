import React, { useEffect, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useRegionStore } from '../../../app/stores/region.store';
import { useStreamStore } from '../../../app/stores/stream.store';
import styles from './Sider.module.css';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items: LevelKeysProps[], level = 1) => {
    items.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items);
  return key;
};

export const AppSider: React.FC = () => {
  const { regions, fetchAllRegions } = useRegionStore();
  const { streams, fetchStreamsByRegion } = useStreamStore();
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(['0']);

  useEffect(() => {
    fetchAllRegions();
  }, [fetchAllRegions]);

  const handleRegionClick = (regionId: number) => {
    fetchStreamsByRegion(regionId);
  };

  const items: MenuItem[] = regions.map((region) => ({
    key: String(region.id),
    label: region.name,
    onTitleClick: () => handleRegionClick(region.id),
    children: streams
      .filter((stream) => stream.regionId === region.id)
      .map((stream) => ({
        key: `${region.id}-${stream.id}`,
        label: stream.location,
      })),
  }));

  const levelKeys = getLevelKeys(items as LevelKeysProps[]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1,
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Sider className={styles['site-layout-background']}>
      <Menu
        mode="inline"
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
    </Sider>
  );
};
