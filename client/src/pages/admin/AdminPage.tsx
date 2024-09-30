import React from 'react';
import { Tabs } from 'antd';
import RegionsTab from '../../widgets/regions.tab';
import StreamsTab from '../../widgets/streams.tab';
import ResponsiblePersonTab from '../../widgets/responsible.person.tab';

const AdminPage: React.FC = () => {
  return (
    <>
      <h1>Админская панель</h1>
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            label: 'Дашборд',
            key: '1',
            children: <div>Заглушка для Дашборда</div>,
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
        ]}
      />
    </>
  );
};

export default AdminPage;
