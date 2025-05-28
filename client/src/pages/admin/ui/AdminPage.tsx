import { Tabs } from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';
import Dashboard from '../../../widgets/dashboard.tab';
import EventTab from '../../../features/event.tab';
import GroupsTab from '../../../widgets/group.tab';
import PlaylistsTab from '../../../features/playlists.tab';
import UsersTab from '../../../features/user.tab';
import StreamsTab from '../../../features/streams.tab';
import ResponsiblePersonTab from '../../../features/responsible.person.tab';

const AdminPage: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('1');

  useEffect(() => {
    document.title = 'Stream manager';
  }, []);

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        centered
        onChange={setActiveTabKey}
        tabBarStyle={{
          padding: '10px 20px',
          borderBottom: '2px solid var(--colorPrimary)',
        }}
        items={[
          {
            label: 'Дашборд',
            key: '1',
            children: <Dashboard isActiveTab={activeTabKey === '1'} />,
          },
          {
            label: 'Плейлисты',
            key: '2',
            children: <PlaylistsTab />,
          },
          {
            label: 'Потоки',
            key: '3',
            children: <StreamsTab />,
          },
          {
            label: 'Ответственные лица',
            key: '4',
            children: <ResponsiblePersonTab />,
          },
          {
            label: 'Группы',
            key: '5',
            children: <GroupsTab />,
          },
          {
            label: 'Пользователи',
            key: '6',
            children: <UsersTab />,
          },
          {
            label: 'События',
            key: '7',
            children: <EventTab isActiveTab={activeTabKey === '7'} />,
          },
        ]}
      />
    </>
  );
};

export default AdminPage;
