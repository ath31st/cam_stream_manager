import React from 'react';
import { Tabs } from 'antd';
import RegionsTab from '../../widgets/regions.tab';

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
            children: <div>Заглушка для управления потоками</div>,
          },
          {
            label: 'Ответственные лица',
            key: '4',
            children: <div>Заглушка для управления ответственными лицами</div>,
          },
        ]}
      />
    </>
  );
};

export default AdminPage;
