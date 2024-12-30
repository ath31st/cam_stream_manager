import React from 'react';
import { Table } from 'antd';
import { paginationConfig } from '../../../shared/pagination';
import ActionButtons from '../../../shared/ui/buttons/ActionButtons';
import styles from './UsersTable.module.css';
import '../../../shared/styles/CommonTabTableStyle.css';
import { User } from '../../../entities/user';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete }) => {
  const dataSource = users.map((user) => ({
    key: user.id,
    username: user.username,
    email: user.email ? user.email : 'не указан',
    role: user.role,
    registeredAt: user.registeredAt,
    isLocked: user.isLocked ? 'Заблок.' : 'Активен',
  }));

  const columns = [
    {
      title: 'Логин',
      dataIndex: 'username',
      key: 'username',
      sorter: (a: { username: string }, b: { username: string }) =>
        a.username.localeCompare(b.username),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
    },
    {
      title: 'Статус',
      dataIndex: 'isLocked',
      key: 'isLocked',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_: unknown, record: { key: number }) => (
        <div className={styles['actions-column']}>
          <ActionButtons
            onEdit={() => onEdit(users.find((u) => u.id === record.key)!)}
            onDelete={() => onDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <Table
      className={styles.table}
      dataSource={dataSource}
      columns={columns}
      pagination={paginationConfig}
      showSorterTooltip={false}
    />
  );
};

export default UsersTable;
