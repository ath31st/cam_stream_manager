import { Form, Input, Modal, Select, Switch } from 'antd';
import type React from 'react';
import type { Group, UpdateUser, User } from '../../../shared/api.types';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import { FooterModal } from '../../../shared/ui';
import {
  emailValidationRules,
  usernameValidationRules,
} from '../../../shared/validations';
import useUpdateUserModalHandlers from '../model/use.update.user.modal.handlers';

interface UpdateUserModalProps {
  groups: Group[];
  visible: boolean;
  user: User | null;
  onConfirm: (updatedUser: UpdateUser) => void;
  onCancel: () => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  groups,
  visible,
  user,
  onConfirm,
  onCancel,
}) => {
  const { form, handleUpdateUser } = useUpdateUserModalHandlers(
    user,
    onConfirm,
  );

  return (
    <Modal
      className={styles.modal}
      title={
        <p className={styles['modal-title']}>Редактирование пользователя</p>
      }
      open={visible}
      onOk={handleUpdateUser}
      onCancel={onCancel}
      footer={
        <FooterModal
          onCancel={onCancel}
          onOk={handleUpdateUser}
          okText="Сохранить"
        />
      }
    >
      <div className={styles['modal-body']}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Логин"
            rules={usernameValidationRules}
          >
            <Input placeholder="Введите новый логин пользователя" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={emailValidationRules}>
            <Input placeholder="Введите новую почту пользователя" />
          </Form.Item>
          <Form.Item
            name="isLocked"
            label="Статус пользователя"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="Заблокирован"
              unCheckedChildren="Активен"
            />
          </Form.Item>
          <Form.Item
            name="role"
            label="Роль"
            rules={[{ required: true, message: 'Выберите роль' }]}
          >
            <Select placeholder="Выберите роль">
              <Select.Option value="ADMIN">Администратор</Select.Option>
              <Select.Option value="USER">Пользователь</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="groupIds" label="Группы">
            <Select mode="multiple" placeholder="Выберите группы">
              {groups.map((group) => (
                <Select.Option key={group.id} value={group.id}>
                  {group.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
