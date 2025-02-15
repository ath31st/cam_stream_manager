import React, { useEffect, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { usePlaylistStore } from '../../../app/stores/playlist.store';
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
  const { playlists, fetchAllPlaylists } = usePlaylistStore();
  const { streams, fetchStreamsByPlaylist, setSelectedStream } = useStreamStore();
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(['0']);
  const onlyVisible = true;

  useEffect(() => {
    fetchAllPlaylists(onlyVisible);
  }, [fetchAllPlaylists, onlyVisible]);

  const handlePlaylistClick = (playlistId: number) => {
    fetchStreamsByPlaylist(playlistId);
  };

  const items: MenuItem[] = playlists.map((playlist) => ({
    key: String(playlist.id),
    label: playlist.name,
    onTitleClick: () => handlePlaylistClick(playlist.id),
    children: streams
      .filter((stream) => stream.playlistId === playlist.id)
      .map((stream) => ({
        key: `${playlist.id}-${stream.id}`,
        label: stream.name,
        onClick: () =>
          setSelectedStream(streams.find((s) => s.id === stream.id)!),
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
    <Sider
      width={300}
      className={styles.sider}
      style={{ height: '100vh', overflowY: 'auto' }}
    >
      <Menu
        mode="inline"
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
    </Sider>
  );
};
