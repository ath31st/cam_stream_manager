import React from 'react';
import { Tabs } from 'antd';

const AdminPage: React.FC = () => {
  return (
    <>
      <h1>Админская панель</h1>
      <Tabs
        defaultActiveKey="1"
        centered
        items={new Array(4).fill(null).map((_, i) => {
          const id = String(i + 1);
          let label = '';
          let content = '';

          switch (id) {
            case '1':
              label = 'Дашборд';
              content = 'Заглушка для Дашборда';
              break;
            case '2':
              label = 'Регионы';
              content = 'Заглушка для управления регионами';
              break;
            case '3':
              label = 'Потоки';
              content = 'Заглушка для управления потоками';
              break;
            case '4':
              label = 'Ответственные лица';
              content = 'Заглушка для управления ответственными лицами';
              break;
            default:
              break;
          }

          return {
            label,
            key: id,
            children: content,
          };
        })}
      />
    </>
  );
};

export default AdminPage;
