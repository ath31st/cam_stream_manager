import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import RegionsTab from '../../widgets/regions.tab';
import StreamsTab from '../../widgets/streams.tab';
import ResponsiblePersonTab from '../../widgets/responsible.person.tab';
import Dashboard from '../../widgets/dashboard.tab';
import EventTab from '../../widgets/event.tab';
import UsersTab from '../../widgets/user.tab';

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
            label: 'Регионы',
            key: '2',
            children: <RegionsTab />,
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
            label: 'Пользователи',
            key: '5',
            children: <UsersTab />,
          },
          {
            label: 'События',
            key: '6',
            children: <EventTab />,
          },
        ]}
      />
    </>
  );
};

export default AdminPage;
